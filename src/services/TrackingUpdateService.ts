import { PrismaClient } from '@prisma/client';
import { addDays, differenceInDays } from 'date-fns';
import { SMSService } from './SMSService';

const prisma = new PrismaClient();
const smsService = new SMSService();

// Configuração dos status para cada dia
const TRACKING_TIMELINE = [
  {
    day: 1,
    status: 'Objeto Postado',
    description: 'Objeto postado, em processamento',
    location: 'Sistema',
    requiresNotification: true,
    notificationType: 'email'
  },
  {
    day: 2,
    status: 'Objeto Em Trânsito',
    description: 'Objeto em trânsito para o destino',
    location: 'Centro de Distribuição',
    requiresNotification: false
  },
  {
    day: 3,
    status: 'Objeto Em Rota de Entrega',
    description: 'Objeto em rota para entrega',
    location: 'Centro de Distribuição Local',
    requiresNotification: false
  },
  {
    day: 4,
    status: 'Objeto Aguardando Liberação',
    description: 'Objeto aguardando liberação',
    location: 'Alfândega',
    requiresNotification: false
  },
  {
    day: 5,
    status: 'Status Pendente',
    description: 'Status pendente, aguardando atualização',
    location: 'Alfândega',
    requiresNotification: true,
    notificationType: 'sms'
  }
];

export class TrackingUpdateService {
  async createInitialTracking(order: any, paidDate: Date) {
    try {
      console.log(`Criando rastreamento inicial para pedido ${order.id}`);
      
      // Cria a primeira atualização - Objeto Postado
      const firstUpdate = await prisma.trackingUpdate.create({
        data: {
          orderId: order.id,
          status: TRACKING_TIMELINE[0].status,
          description: TRACKING_TIMELINE[0].description,
          location: TRACKING_TIMELINE[0].location,
          createdAt: paidDate
        }
      });
      
      console.log(`Atualização inicial criada: ${firstUpdate.id}`);
      
      // Atualiza o status do pedido
      await prisma.order.update({
        where: { id: order.id },
        data: { 
          status: 'in_transit',
          currentStep: 1
        }
      });
      
      return firstUpdate;
    } catch (error) {
      console.error('Erro ao criar rastreamento inicial:', error);
      throw error;
    }
  }
  
  async checkAndUpdateTrackingStatus() {
    try {
      // Buscar todos os pedidos ativos que têm pelo menos uma atualização
      const orders = await prisma.order.findMany({
        where: {
          status: { 
            notIn: ['delivered', 'cancelled'] 
          },
          trackingUpdates: {
            some: {}
          }
        },
        include: {
          trackingUpdates: {
            orderBy: {
              createdAt: 'asc'
            }
          },
          customer: true
        }
      });
      
      console.log(`Verificando atualizações para ${orders.length} pedidos`);
      
      for (const order of orders) {
        // Primeiro evento de rastreamento 
        const firstUpdate = order.trackingUpdates[0];
        
        // Data atual
        const now = new Date();
        
        // Calcula quantos dias se passaram desde a primeira atualização
        const daysSinceStart = differenceInDays(now, firstUpdate.createdAt);
        
        console.log(`Pedido ${order.id}: ${daysSinceStart} dias desde o início`);
        
        // Determina qual deve ser o status atual baseado no número de dias
        let targetStep = 1;
        for (const step of TRACKING_TIMELINE) {
          if (daysSinceStart >= step.day - 1) {
            targetStep = step.day;
          } else {
            break;
          }
        }
        
        // Se o passo atual for menor que o esperado, atualize
        if (order.currentStep < targetStep) {
          console.log(`Atualizando pedido ${order.id} do passo ${order.currentStep} para ${targetStep}`);
          
          // Obter informações do novo status
          const stepInfo = TRACKING_TIMELINE[targetStep - 1];
          
          // Criar nova atualização de rastreamento
          const update = await prisma.trackingUpdate.create({
            data: {
              orderId: order.id,
              status: stepInfo.status,
              description: stepInfo.description,
              location: stepInfo.location,
              createdAt: addDays(firstUpdate.createdAt, stepInfo.day - 1)
            }
          });
          
          // Atualizar status do pedido
          await prisma.order.update({
            where: { id: order.id },
            data: { currentStep: targetStep }
          });
          
          // Enviar notificação se necessário
          if (stepInfo.requiresNotification && order.customer) {
            if (stepInfo.notificationType === 'sms' && order.customer.phone) {
              await smsService.sendSMS(
                order.customer.phone,
                `Olá ${order.customer.name}, seu pedido com código ${order.trackingCode} teve uma atualização: ${stepInfo.status}. Acesse rastreioexpress.com para mais detalhes.`
              );
            }
            // Notificações de email são tratadas pelo EmailSequenceService
          }
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar status de rastreamento:', error);
      throw error;
    }
  }
} 