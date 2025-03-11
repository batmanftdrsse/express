import { EmailSequenceService } from '../services/EmailSequenceService';
import { PrismaClient } from '@prisma/client';

async function testSequence() {
  const sequenceService = new EmailSequenceService();
  const prisma = new PrismaClient();
  
  try {
    // Limpar sequências existentes
    await prisma.emailLog.deleteMany();
    await prisma.emailSequence.deleteMany();

    // Buscar o pedido de teste
    const order = await prisma.order.findFirst({
      where: { trackingCode: 'TEST123456' }
    });

    if (!order) {
      throw new Error('Pedido de teste não encontrado');
    }

    console.log('Iniciando sequência para o pedido:', order.id);
    
    // Iniciar a sequência de emails
    const sequence = await sequenceService.startSequence(order.id);
    console.log('Sequência iniciada:', sequence);

    // Aguardar um pouco e verificar o status
    await new Promise(resolve => setTimeout(resolve, 2000));

    const updatedSequence = await prisma.emailSequence.findUnique({
      where: { id: sequence.id },
      include: {
        emailLogs: true,
        order: {
          include: {
            customer: true
          }
        }
      }
    });

    console.log('Status da sequência:', {
      currentStep: updatedSequence?.currentStep,
      status: updatedSequence?.status,
      emailsSent: updatedSequence?.emailLogs.length
    });

  } catch (error) {
    console.error('Erro no teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testSequence();