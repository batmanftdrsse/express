import { PrismaClient } from '@prisma/client';
import { addDays, subDays } from 'date-fns';
import { TrackingCodeService } from '../services/TrackingCodeService';

const prisma = new PrismaClient();
const trackingCodeService = new TrackingCodeService();

// Configuração dos status para cada dia (igual ao TrackingUpdateService)
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

// Exemplos de clientes
const SAMPLE_CUSTOMERS = [
  {
    name: 'Maria Silva',
    email: 'maria.silva@exemplo.com',
    phone: '11987654321',
    document: {
      type: 'cpf',
      number: '12345678900'
    },
    address: {
      street: 'Avenida Paulista',
      streetNumber: '1000',
      complement: 'Apto 123',
      zipCode: '01310-100',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      country: 'BR'
    }
  },
  {
    name: 'João Oliveira',
    email: 'joao.oliveira@exemplo.com',
    phone: '21987654321',
    document: {
      type: 'cpf',
      number: '98765432100'
    },
    address: {
      street: 'Rua do Catete',
      streetNumber: '200',
      complement: 'Casa',
      zipCode: '22220-000',
      neighborhood: 'Catete',
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BR'
    }
  },
  {
    name: 'Ana Santos',
    email: 'ana.santos@exemplo.com',
    phone: '31987654321',
    document: {
      type: 'cpf',
      number: '45678912300'
    },
    address: {
      street: 'Avenida Afonso Pena',
      streetNumber: '1500',
      complement: 'Sala 303',
      zipCode: '30130-000',
      neighborhood: 'Centro',
      city: 'Belo Horizonte',
      state: 'MG',
      country: 'BR'
    }
  },
  {
    name: 'Carlos Mendes',
    email: 'carlos.mendes@exemplo.com',
    phone: '41987654321',
    document: {
      type: 'cpf',
      number: '78912345600'
    },
    address: {
      street: 'Rua XV de Novembro',
      streetNumber: '700',
      complement: null,
      zipCode: '80020-310',
      neighborhood: 'Centro',
      city: 'Curitiba',
      state: 'PR',
      country: 'BR'
    }
  },
  {
    name: 'Luciana Costa',
    email: 'luciana.costa@exemplo.com',
    phone: '51987654321',
    document: {
      type: 'cpf',
      number: '32165498700'
    },
    address: {
      street: 'Avenida Ipiranga',
      streetNumber: '2000',
      complement: 'Bloco B, Apto 502',
      zipCode: '90160-093',
      neighborhood: 'Azenha',
      city: 'Porto Alegre',
      state: 'RS',
      country: 'BR'
    }
  }
];

// Exemplos de produtos
const SAMPLE_PRODUCTS = [
  { title: 'Smartphone Galaxy S23', unitPrice: 399900 },
  { title: 'Notebook Dell XPS 15', unitPrice: 899900 },
  { title: 'Fone de Ouvido Bluetooth', unitPrice: 29900 },
  { title: 'Smartwatch Apple Watch', unitPrice: 249900 },
  { title: 'Tablet iPad Pro', unitPrice: 599900 }
];

// Função para criar histórico de rastreamento para um pedido
async function createTrackingHistoryForOrder(orderId: number, startDate: Date, currentStep: number) {
  const updates = [];

  for (let i = 0; i < currentStep; i++) {
    const stepInfo = TRACKING_TIMELINE[i];
    const updateDate = addDays(startDate, i);

    const update = await prisma.trackingUpdate.create({
      data: {
        orderId,
        status: stepInfo.status,
        location: stepInfo.location,
        description: stepInfo.description,
        createdAt: updateDate
      }
    });

    updates.push(update);
  }

  return updates;
}

// Simular um log de SMS (já que não temos uma tabela SMSLog no schema)
async function logSMS(phone: string, message: string, sentAt: Date) {
  console.log(`[Simulação de SMS] Para: ${phone}, Mensagem: ${message}, Data: ${sentAt.toISOString()}`);
  
  // Poderíamos criar uma tabela para isso no banco de dados
  return { success: true, id: Math.floor(Math.random() * 1000) };
}

// Função principal para criar os exemplos
async function generateExamples() {
  try {
    // Limpar dados existentes
    console.log('Limpando dados existentes...');
    await prisma.trackingUpdate.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.emailLog.deleteMany({});
    await prisma.emailSequence.deleteMany({});
    await prisma.funnelStep.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.customerDocument.deleteMany({});
    await prisma.address.deleteMany({});
    await prisma.customer.deleteMany({});
    
    console.log('Criando exemplos...');

    // Criar 5 exemplos em diferentes dias após o pagamento
    for (let i = 0; i < 5; i++) {
      const customerData = SAMPLE_CUSTOMERS[i];
      const productData = SAMPLE_PRODUCTS[i];
      const currentStep = i + 1; // Dias 1 a 5
      
      // Data de pagamento - subtrair currentStep dias da data atual
      // para que o primeiro exemplo esteja no dia 1, o segundo no dia 2, etc.
      const paidDate = subDays(new Date(), currentStep);
      
      // Criar ou obter cliente
      const customer = await prisma.customer.create({
        data: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          document: {
            create: {
              type: customerData.document.type,
              number: customerData.document.number
            }
          },
          address: {
            create: {
              street: customerData.address.street,
              streetNumber: customerData.address.streetNumber,
              complement: customerData.address.complement,
              zipCode: customerData.address.zipCode,
              neighborhood: customerData.address.neighborhood,
              city: customerData.address.city,
              state: customerData.address.state,
              country: customerData.address.country
            }
          }
        }
      });
      
      // Gerar código de rastreamento
      const trackingCode = await trackingCodeService.createTrackingCode(`EXEMPLO${i+1}`);
      
      // Criar pedido
      const order = await prisma.order.create({
        data: {
          trackingCode,
          status: currentStep === 5 ? 'pending' : 'in_transit', // No dia 5, muda para "pendente"
          currentStep,
          customerId: customer.id,
          origin: 'Sistema',
          destination: `${customerData.address.city}, ${customerData.address.state}`,
          estimatedDelivery: addDays(new Date(), 7 - currentStep),
          items: {
            create: {
              title: productData.title,
              quantity: 1,
              unitPrice: productData.unitPrice / 100 // Convertendo para reais
            }
          }
        }
      });
      
      // Criar histórico de rastreamento
      await createTrackingHistoryForOrder(order.id, paidDate, currentStep);
      
      // Simular registros de notificações enviadas
      if (currentStep >= 1) {
        // Email no dia 1
        await prisma.emailSequence.create({
          data: {
            orderId: order.id,
            currentStep: 2, // Já enviou o primeiro email
            status: 'active',
            startedAt: paidDate,
            lastEmailSentAt: paidDate,
            emailLogs: {
              create: {
                step: 1,
                emailType: 'WELCOME',
                status: 'SENT',
                templateId: '0p7kx4xo08749yjr',
                sentAt: paidDate
              }
            }
          }
        });
      }
      
      if (currentStep >= 5) {
        // SMS no dia 5
        await logSMS(
          customerData.phone,
          `Olá ${customerData.name}, seu pedido com código ${trackingCode} teve uma atualização: ${TRACKING_TIMELINE[4].status}. Acesse rastreioexpress.com para mais detalhes.`,
          addDays(paidDate, 4)
        );
      }
      
      console.log(`Exemplo ${i+1} criado: Cliente ${customer.name}, Pedido ${order.id}, Código ${trackingCode}, Passo ${currentStep}`);
    }
    
    console.log('Exemplos criados com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar exemplos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar a função
generateExamples()
  .then(() => console.log('Processo concluído.'))
  .catch(console.error); 