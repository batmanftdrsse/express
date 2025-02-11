import { PrismaClient, EmailType, EmailStatus } from '@prisma/client'
import { emailTemplates } from '../templates/emails'

const prisma = new PrismaClient()

export class EmailService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.MAILERSEND_API_KEY || ''
    this.baseUrl = 'https://api.mailersend.com/v1'
  }

  async sendEmail(to: string, type: EmailType, data: any) {
    try {
      // Cria o log antes de enviar
      const emailLog = await prisma.emailLog.create({
        data: {
          email: to,
          type,
          status: EmailStatus.PENDING,
          metadata: data
        }
      })

      // Configura o email baseado no tipo
      const template = emailTemplates[type](data)

      // Prepara o payload para a API do MailerSend
      const payload = {
        from: {
          email: process.env.SMTP_FROM,
          name: 'RastreioExpress'
        },
        to: [
          {
            email: to
          }
        ],
        subject: template.subject,
        html: template.html,
        text: template.html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
        tags: [type, emailLog.id]
      }

      // Envia o email usando a API do MailerSend
      const response = await fetch(`${this.baseUrl}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`MailerSend API error: ${JSON.stringify(error)}`)
      }

      // Atualiza o status
      await prisma.emailLog.update({
        where: { id: emailLog.id },
        data: { status: EmailStatus.SENT }
      })

      return emailLog

    } catch (error) {
      console.error('Erro ao enviar email:', error)
      throw error
    }
  }
} 