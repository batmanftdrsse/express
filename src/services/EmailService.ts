import nodemailer from 'nodemailer';
import { PrismaClient, EmailType, EmailStatus } from '@prisma/client'

const TEMPLATES = {
  WELCOME: '0p7kx4xo08749yjr',
  ORDER_CONFIRMATION: 'z3m5jgr1jeo4dpyo',
  SHIPPING_UPDATE: '3zxk54v1oq64jy6v'
} as const

export class EmailService {
  private transporter: nodemailer.Transporter;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendEmail(to: string, subject: string, templateId: string, variables: Record<string, any>) {
    try {
      console.log('Enviando email:', { to, templateId, variables });

      const info = await this.transporter.sendMail({
        from: `"${process.env.MAILERSEND_FROM_NAME}" <${process.env.MAILERSEND_FROM_EMAIL}>`,
        to,
        subject,
        html: `<div>Template ID: ${templateId}</div>
              <pre>${JSON.stringify(variables, null, 2)}</pre>`
      });

      console.log('Email enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }

  async logEmailSent(data: {
    sequenceId: string;
    step: number;
    type: EmailType;
    email: string;
    templateId: string;
    metadata?: Record<string, any>;
  }) {
    return this.prisma.emailLog.create({
      data: {
        step: data.step,
        emailType: data.type,
        templateId: data.templateId,
        status: EmailStatus.SENT,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        sequence: {
          connect: { id: data.sequenceId.toString() }
        }
      }
    });
  }
} 