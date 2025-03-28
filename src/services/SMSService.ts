import { PrismaClient } from '@prisma/client';

export class SMSService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async sendSMS(phoneNumber: string, message: string) {
    try {
      console.log(`[SMS Service] Enviando SMS para ${phoneNumber}: ${message}`);
      
      // Em produção, integraria com um provedor de SMS real como Twilio, Zenvia, etc.
      // Por enquanto, apenas simularemos o envio

      // Registrar o envio de SMS
      const smsLog = await this.prisma.smsLog.create({
        data: {
          phone: phoneNumber,
          message: message,
          status: 'sent',
          sentAt: new Date()
        }
      });
      
      console.log(`[SMS Service] SMS registrado com ID: ${smsLog.id}`);
      
      return {
        success: true,
        id: smsLog.id
      };
    } catch (error) {
      console.error('[SMS Service] Erro ao enviar SMS:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }
} 