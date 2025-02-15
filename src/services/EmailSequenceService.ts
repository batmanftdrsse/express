import { PrismaClient, Prisma } from '@prisma/client'
import type { Order, EmailType } from '@prisma/client'
import { MailerService } from './MailerService'

const prisma = new PrismaClient()
const mailer = new MailerService()

interface EmailTemplate {
  id: string
  type: EmailType
  delayDays: number
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'template1', // ID do template no MailerSend
    type: 'PURCHASE_CONFIRMATION',
    delayDays: 0
  },
  {
    id: 'template2', // ID do template no MailerSend
    type: 'TRANSIT_UPDATE',
    delayDays: 4
  },
  {
    id: 'template3', // ID do template no MailerSend
    type: 'CUSTOMS_NOTIFICATION',
    delayDays: 7
  }
]

export class EmailSequenceService {
  async startSequence(order: Order) {
    try {
      // Cria a sequência de emails
      const sequence = await prisma.emailSequence.create({
        data: {
          orderId: order.id,
          status: 'ACTIVE'
        }
      })

      // Agenda todos os emails da sequência
      for (const template of EMAIL_TEMPLATES) {
        await prisma.emailLog.create({
          data: {
            sequenceId: sequence.id,
            emailType: template.type,
            status: 'PENDING'
          }
        })
      }

      // Envia o primeiro email imediatamente
      await this.sendPurchaseConfirmation(order, sequence.id)

      return sequence
    } catch (error) {
      console.error('Erro ao iniciar sequência:', error)
      throw error
    }
  }

  private async sendPurchaseConfirmation(order: Order, sequenceId: number) {
    try {
      const template = EMAIL_TEMPLATES[0]
      
      await mailer.sendEmail(
        order.customerEmail,
        template.id,
        {
          name: order.customerName,
          tracking_code: order.trackingCode,
          tracking_url: `https://seusite.com/rastrear/${order.trackingCode}`
        }
      )

      await prisma.emailLog.updateMany({
        where: {
          sequenceId,
          emailType: template.type
        },
        data: {
          status: 'SENT',
          sentAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erro ao enviar email de confirmação:', error)
      await this.logEmailError(sequenceId, 'PURCHASE_CONFIRMATION', error)
      throw error
    }
  }

  async processScheduledEmails() {
    try {
      const sequences = await prisma.emailSequence.findMany({
        where: { status: 'ACTIVE' },
        include: {
          order: true,
          emailLogs: true
        }
      })

      for (const sequence of sequences) {
        const { order, emailLogs } = sequence
        const daysSinceStart = Math.floor(
          (new Date().getTime() - sequence.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )

        // Processa cada template que deve ser enviado
        for (const template of EMAIL_TEMPLATES) {
          if (daysSinceStart >= template.delayDays) {
            const emailLog = emailLogs.find(log => 
              log.emailType === template.type && log.status === 'PENDING'
            )

            if (emailLog) {
              try {
                await mailer.sendEmail(
                  order.customerEmail,
                  template.id,
                  {
                    name: order.customerName,
                    tracking_code: order.trackingCode,
                    tracking_url: `https://seusite.com/rastrear/${order.trackingCode}`,
                    // Dados específicos para cada tipo de email
                    ...(template.type === 'CUSTOMS_NOTIFICATION' && {
                      customs_fee: 'R$ XXX,XX' // Valor exemplo
                    })
                  }
                )

                await prisma.emailLog.update({
                  where: { id: emailLog.id },
                  data: {
                    status: 'SENT',
                    sentAt: new Date()
                  }
                })
              } catch (error) {
                await this.logEmailError(sequence.id, template.type, error)
              }
            }
          }
        }

        // Verifica se todos os emails foram enviados
        const allEmailsSent = emailLogs.every(log => log.status === 'SENT')
        if (allEmailsSent) {
          await prisma.emailSequence.update({
            where: { id: sequence.id },
            data: { status: 'COMPLETED' }
          })
        }
      }
    } catch (error) {
      console.error('Erro ao processar emails agendados:', error)
      throw error
    }
  }

  private async logEmailError(sequenceId: number, emailType: EmailType, error: any) {
    await prisma.emailLog.updateMany({
      where: {
        sequenceId,
        emailType
      },
      data: {
        status: 'FAILED',
        error: error.message || 'Erro desconhecido'
      }
    })
  }
} 