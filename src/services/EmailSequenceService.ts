import { PrismaClient, EmailType } from '@prisma/client'
import { EmailService } from './EmailService'

const TEMPLATES = {
  WELCOME: '0p7kx4xo08749yjr',
  ORDER_CONFIRMATION: 'z3m5jgr1jeo4dpyo',
  SHIPPING_UPDATE: '3zxk54v1oq64jy6v'
} as const

const SEQUENCE_STEPS = [
  {
    template: TEMPLATES.WELCOME,
    subject: 'Bem-vindo ao RastreioExpress',
    type: EmailType.WELCOME,
    delay: 0 // imediato
  },
  {
    template: TEMPLATES.ORDER_CONFIRMATION,
    subject: 'Seu pedido foi confirmado',
    type: EmailType.ORDER_CONFIRMATION,
    delay: 1 * 60 * 60 * 1000 // 1 hora
  },
  {
    template: TEMPLATES.SHIPPING_UPDATE,
    subject: 'Atualização do seu pedido',
    type: EmailType.SHIPPING_UPDATE,
    delay: 24 * 60 * 60 * 1000 // 24 horas
  }
]

export class EmailSequenceService {
  private prisma: PrismaClient
  private emailService: EmailService

  constructor() {
    this.prisma = new PrismaClient()
    this.emailService = new EmailService()
  }

  async startSequence(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true }
    })

    if (!order) throw new Error('Pedido não encontrado')

    // Verificar se já existe uma sequência para este pedido
    const existingSequence = await this.prisma.emailSequence.findUnique({
      where: { orderId: order.id }
    })

    if (existingSequence) {
      throw new Error('Já existe uma sequência de emails para este pedido')
    }

    const sequence = await this.prisma.emailSequence.create({
      data: {
        currentStep: 1,
        status: 'active',
        order: {
          connect: { id: orderId }
        }
      }
    })

    // Envia o primeiro email imediatamente
    await this.sendNextEmail(sequence.id)

    return sequence
  }

  async sendNextEmail(sequenceId: string) {
    const sequence = await this.prisma.emailSequence.findUnique({
      where: { id: sequenceId },
      include: {
        order: {
          include: { customer: true }
        }
      }
    })

    if (!sequence) throw new Error('Sequência não encontrada')
    if (sequence.status !== 'active') return

    const step = SEQUENCE_STEPS[sequence.currentStep - 1]
    if (!step) {
      // Finaliza a sequência se não houver mais emails
      await this.prisma.emailSequence.update({
        where: { id: sequenceId },
        data: {
          status: 'completed',
          completedAt: new Date()
        }
      })
      return
    }

    try {
      await this.emailService.sendEmail(
        sequence.order.customer.email,
        step.subject,
        step.template,
        {
          customerName: sequence.order.customer.name,
          trackingCode: sequence.order.trackingCode,
          orderNumber: sequence.order.id
        }
      )

      await this.emailService.logEmailSent({
        sequenceId: sequenceId,
        step: sequence.currentStep,
        type: step.type,
        email: sequence.order.customer.email,
        templateId: step.template
      })

      // Atualiza o status da sequência
      await this.prisma.emailSequence.update({
        where: { id: sequenceId },
        data: {
          currentStep: sequence.currentStep + 1,
          lastEmailSentAt: new Date()
        }
      })
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      throw error
    }
  }
} 