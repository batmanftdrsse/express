import { PrismaClient } from '@prisma/client';
import { addDays, subHours } from 'date-fns';

const prisma = new PrismaClient();

export class TrackingService {
  private trackingSteps = [
    {
      step: 1,
      status: 'Objeto postado',
      location: 'CHINA',
      needsEmail: true,
      emailType: 'WELCOME'
    },
    {
      step: 2,
      status: 'Objeto em transferência',
      location: 'CHINA',
      needsEmail: false
    },
    {
      step: 3,
      status: 'Chegou ao Brasil',
      location: 'SÃO PAULO - SP',
      needsEmail: false
    },
    {
      step: 4,
      status: 'Objeto recebido no Centro de Distribuição',
      location: 'SÃO PAULO - SP',
      needsEmail: true,
      emailType: 'SECOND_NOTICE'
    },
    {
      step: 5,
      status: 'Objeto em trânsito - por favor aguarde',
      location: 'CURITIBA - PR',
      needsEmail: false
    },
    {
      step: 6,
      status: 'Em processamento no centro de distribuição',
      location: 'CURITIBA - PR',
      needsEmail: false
    },
    {
      step: 7,
      status: 'Pacote retido - regularize imediatamente',
      location: 'CURITIBA - PR',
      needsEmail: true,
      emailType: 'RETENTION_NOTICE'
    }
  ];

  async getTrackingInfo(code: string) {
    const order = await prisma.order.findUnique({
      where: { trackingCode: code },
      include: {
        trackingUpdates: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    return order;
  }

  async updateTrackingStatus(orderId: string) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { trackingUpdates: true }
    });

    if (!order) return;

    const firstUpdate = order.trackingUpdates[0];
    const daysSinceStart = Math.floor(
      (Date.now() - firstUpdate.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    const newStep = this.calculateStep(daysSinceStart);
    const stepInfo = this.trackingSteps[newStep - 1];

    if (newStep !== order.currentStep) {
      await prisma.trackingUpdate.create({
        data: {
          orderId: order.id,
          status: stepInfo.status,
          location: stepInfo.location,
          createdAt: addDays(firstUpdate.createdAt, daysSinceStart)
        }
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { currentStep: newStep }
      });

      if (stepInfo.needsEmail) {
        // Enviar email usando o EmailService
        // Implementar lógica de envio de email aqui
      }
    }
  }

  private calculateStep(daysSinceStart: number): number {
    if (daysSinceStart >= 4) return 7;
    if (daysSinceStart >= 3) return 6;
    if (daysSinceStart >= 2) return 4;
    if (daysSinceStart >= 1) return 2;
    return 1;
  }
} 