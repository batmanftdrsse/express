import { PrismaClient } from '@prisma/client';
import { FunnelManagerService } from '../services/FunnelManagerService';

const prisma = new PrismaClient();

async function setupTestData() {
  try {
    // 1. Criar funis de teste
    const funnelManager = new FunnelManagerService();
    
    console.log('Criando funil de teste...');
    
    // Funil para cartão de crédito
    const creditCardFunnel = await funnelManager.createFunnel({
      name: "Funil Cartão de Crédito",
      payment_method: "credit_card",
      steps: [
        {
          step_number: 1,
          email_subject: "Confirmação de Compra - Cartão",
          email_template: "Olá {{name}}, sua compra no cartão foi confirmada!",
          delay_hours: 0
        },
        {
          step_number: 2,
          email_subject: "Como está sua experiência?",
          email_template: "Olá {{name}}, como está aproveitando sua compra?",
          delay_hours: 48
        }
      ]
    });

    console.log('Funil criado:', creditCardFunnel);

    // 2. Criar funil para PIX
    const pixFunnel = await funnelManager.createFunnel({
      name: "Funil PIX",
      payment_method: "pix",
      steps: [
        {
          step_number: 1,
          email_subject: "Pagamento PIX Confirmado",
          email_template: "Olá {{name}}, recebemos seu pagamento via PIX!",
          delay_hours: 0
        }
      ]
    });

    console.log('Funil PIX criado:', pixFunnel);

    console.log('Dados de teste criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar dados de teste:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar setup
setupTestData()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  }); 