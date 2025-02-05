import prisma from '../lib/prisma';
import { MailerService } from './MailerService';
import { EmailTemplate } from '../types/email';

const mailerService = new MailerService();

const EMAIL_SEQUENCE = [
  {
    day: 0,
    type: 'PURCHASE_CONFIRMATION',
    subject: 'Confirmação do seu pedido',
    template: '3vz9dle2qknlkj50', // Verifique se este ID existe no MailerSend
    variables: (order: any) => ({
      account_name: order.customer.name || 'Cliente',
      cod_rastreio: `RAE${order.id.toString().padStart(6, '0')}`,
      data_estimada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      link_user: `https://rastreioexpress.com/tracking/${order.id}`
    })
  },
  {
    day: 1,
    type: 'TRACKING_INFO',
    subject: 'Informações de rastreamento',
    template: 'tracking-info'
  },
  {
    day: 3,
    type: 'DELIVERY_UPDATE',
    subject: 'Atualização do seu pedido',
    template: 'delivery-update'
  },
  {
    day: 5,
    type: 'ESTIMATED_ARRIVAL',
    subject: 'Previsão de entrega',
    template: 'estimated-arrival'
  },
  {
    day: 7,
    type: 'DELIVERY_PREPARATION',
    subject: 'Preparando sua entrega',
    template: 'delivery-prep'
  },
  {
    day: 10,
    type: 'FEEDBACK_REQUEST',
    subject: 'Como foi sua experiência?',
    template: 'feedback'
  }
];

export class EmailSequenceService {
  async startSequence(orderData: any) {
    try {
      console.log('Iniciando sequência para:', orderData);
      
      const { customer, id: orderId } = orderData;
      
      let sequence;
      try {
        // Criar nova sequência
        sequence = await prisma.emailSequences.create({
          data: {
            customer_id: customer.id,
            order_id: orderId,
            customer_name: customer.name || 'Cliente',
            customer_email: customer.email,
            status: 'active'
          }
        });
        console.log('Sequência criada:', sequence);
      } catch (dbError) {
        console.error('Erro ao criar sequência:', dbError);
        throw new Error('Falha ao criar sequência no banco de dados');
      }

      // Enviar primeiro email imediatamente
      const firstTemplate = EMAIL_SEQUENCE[0];
      if (!firstTemplate) {
        throw new Error('Template inicial não encontrado');
      }

      console.log('Enviando primeiro email com template:', firstTemplate);
      
      await this.sendEmail(sequence.id, customer.email, firstTemplate, orderData);
      
      return sequence;
    } catch (error) {
      console.error('Erro ao iniciar sequência:', error);
      throw error;
    }
  }

  async processScheduledEmails() {
    const activeSequences = await prisma.emailSequences.findMany({
      where: { status: 'active' }
    });

    for (const sequence of activeSequences) {
      await this.checkAndSendNextEmail(sequence);
    }
  }

  private async checkAndSendNextEmail(sequence: any) {
    const daysSinceStart = this.getDaysSinceStart(sequence.started_at);
    const nextEmail = EMAIL_SEQUENCE.find(email => email.day === daysSinceStart);

    if (nextEmail) {
      // Enviar próximo email da sequência
      await this.sendEmail(sequence.id, sequence.customer_email, nextEmail, sequence.order_id);
    }
  }

  private getDaysSinceStart(startDate: Date): number {
    return Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private async sendEmail(sequenceId: number, email: string, template: EmailTemplate, orderData: any) {
    try {
      const sequence = await prisma.emailSequences.findUnique({
        where: { id: sequenceId }
      });

      if (!sequence) throw new Error('Sequência não encontrada');

      const variables = template.variables ? 
        template.variables({
          id: sequence.order_id,
          customer: {
            name: sequence.customer_name || 'Cliente'
          }
        }) : {};

      console.log('Preparando envio de email:', {
        sequenceId,
        email,
        template: template.type,
        variables: variables
      });

      await mailerService.sendEmail(
        email,
        template.template,
        variables
      );

      console.log('Email enviado com sucesso');

      // Registrar o envio
      await prisma.emailLogs.create({
        data: {
          sequence_id: sequenceId,
          step: EMAIL_SEQUENCE.findIndex(t => t.type === template.type) + 1,
          email_type: template.type,
          status: 'sent',
          customer_email: email
        }
      });

      // Atualizar a sequência
      await prisma.emailSequences.update({
        where: { id: sequenceId },
        data: {
          current_step: EMAIL_SEQUENCE.findIndex(t => t.type === template.type) + 1,
          last_email_sent_at: new Date()
        }
      });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }

  async retryEmail(sequenceId: number, emailType: string) {
    try {
      const sequence = await prisma.emailSequences.findUnique({
        where: { id: sequenceId },
        include: { email_logs: true }
      });

      if (!sequence) throw new Error('Sequência não encontrada');

      const template = EMAIL_SEQUENCE.find(t => t.type === emailType);
      if (!template) throw new Error('Template não encontrado');

      await this.sendEmail(
        sequence.id,
        sequence.customer_email,
        template,
        { id: sequence.order_id, customer: { name: sequence.customer_name } }
      );

      return true;
    } catch (error) {
      console.error('Erro ao reenviar email:', error);
      throw error;
    }
  }
} 