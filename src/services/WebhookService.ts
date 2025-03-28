import { PrismaClient } from '@prisma/client';
import { TrackingCodeService } from './TrackingCodeService';
import { EmailSequenceService } from './EmailSequenceService';
import { TrackingUpdateService } from './TrackingUpdateService';

const prisma = new PrismaClient();
const trackingService = new TrackingCodeService();
const emailService = new EmailSequenceService();
const trackingUpdateService = new TrackingUpdateService();

interface WebhookPayload {
  id: number;
  amount: number;
  paidAmount: number;
  refundedAmount: number;
  companyId: number;
  installments: number;
  paymentMethod: string;
  status: string;
  secureId: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    document: {
      number: string;
      type: string;
    };
    address: {
      street: string | null;
      streetNumber: string | null;
      complement: string | null;
      zipCode: string | null;
      neighborhood: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    };
  };
  items: Array<{
    title: string;
    unitPrice: number;
    quantity: number;
  }>;
}

// Função para gerar dados de teste
const generateTestPayloads = () => {
  const basePayload = {
    companyId: 2,
    status: "paid",
    paymentMethod: "credit_card",
    refundedAmount: 0,
    traceable: false,
  };

  return [
    // Cliente Pessoa Física - Cartão de Crédito
    {
      ...basePayload,
      id: 283,
      amount: 15000,
      installments: 12,
      secureId: "a4594817-be48-4a23-81aa-4bb01f95fe78",
      paidAt: new Date().toISOString(),
      customer: {
        id: 1,
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "11998887766",
        document: { number: "33344455566", type: "cpf" },
        address: {
          street: "Avenida Paulista",
          streetNumber: "1000",
          complement: "Apto 123",
          zipCode: "01310100",
          neighborhood: "Bela Vista",
          city: "São Paulo",
          state: "SP",
          country: "BR"
        }
      },
      card: {
        brand: "mastercard",
        holderName: "MARIA SILVA",
        lastDigits: "4321"
      },
      items: [{ title: "Curso Marketing Digital", unitPrice: 15000, quantity: 1 }]
    },

    // Cliente Empresarial - PIX
    {
      ...basePayload,
      id: 284,
      amount: 299900,
      paymentMethod: "pix",
      installments: 1,
      secureId: "b5605928-cf59-5b34-92bb-5cc02f06fe89",
      paidAt: new Date().toISOString(),
      customer: {
        id: 2,
        name: "Tech Solutions LTDA",
        email: "financeiro@techsolutions.com.br",
        phone: "1133334444",
        document: { number: "12345678000199", type: "cnpj" },
        address: {
          street: "Rua da Tecnologia",
          streetNumber: "500",
          complement: "Andar 15",
          zipCode: "04552000",
          neighborhood: "Vila Olímpia",
          city: "São Paulo",
          state: "SP",
          country: "BR"
        }
      },
      items: [{ title: "Consultoria Enterprise", unitPrice: 299900, quantity: 1 }]
    },

    // Cliente Estudante - Boleto
    {
      ...basePayload,
      id: 285,
      amount: 9900,
      paymentMethod: "boleto",
      installments: 1,
      secureId: "c6716039-dg60-6c45-03cc-6dd13g17gf90",
      paidAt: new Date().toISOString(),
      customer: {
        id: 3,
        name: "João Santos",
        email: "joao.santos@estudante.com",
        phone: "21977776666",
        document: { number: "44455566677", type: "cpf" },
        address: {
          street: "Rua das Universidades",
          streetNumber: "100",
          complement: null,
          zipCode: "20271130",
          neighborhood: "Tijuca",
          city: "Rio de Janeiro",
          state: "RJ",
          country: "BR"
        }
      },
      items: [{ title: "Curso Python Básico", unitPrice: 9900, quantity: 1 }]
    }
  ];
};

// Função para testar
const runTests = async () => {
  const webhookService = new WebhookService();
  const payloads = generateTestPayloads();

  for (const payload of payloads) {
    try {
      console.log(`Processando pedido ${payload.id} para ${payload.customer.name}`);
      await webhookService.processPayment(payload);
      console.log(`Pedido ${payload.id} processado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao processar pedido ${payload.id}:`, error);
    }
  }
};

export class WebhookService {
  async processPayment(payload: WebhookPayload) {
    try {
      // Verificar se o pagamento foi aprovado
      if (payload.status !== 'paid') {
        console.log(`Pagamento ${payload.id} com status ${payload.status}, ignorando.`);
        return {
          success: false,
          message: 'Pagamento não aprovado'
        };
      }
      
      console.log(`Processando pagamento aprovado: ${payload.id}`);
      
      // Gerar código de rastreamento
      const trackingCode = await trackingService.createTrackingCode(payload.id.toString());
      console.log(`Código de rastreamento gerado: ${trackingCode}`);
      
      // Verificar se o cliente já existe
      let customer = await prisma.customer.findFirst({
        where: {
          email: payload.customer.email
        }
      });
      
      // Criar cliente se não existir
      if (!customer) {
        customer = await prisma.customer.create({
          data: {
            name: payload.customer.name,
            email: payload.customer.email,
            phone: payload.customer.phone,
            address: payload.customer.address.street ? {
              create: {
                street: payload.customer.address.street || '',
                streetNumber: payload.customer.address.streetNumber || '',
                complement: payload.customer.address.complement,
                zipCode: payload.customer.address.zipCode || '',
                neighborhood: payload.customer.address.neighborhood || '',
                city: payload.customer.address.city || '',
                state: payload.customer.address.state || '',
                country: payload.customer.address.country || 'BR'
              }
            } : undefined,
            document: {
              create: {
                type: payload.customer.document.type,
                number: payload.customer.document.number
              }
            }
          }
        });
        console.log(`Cliente criado: ${customer.id}`);
      }
      
      // Criar pedido
      const order = await prisma.order.create({
        data: {
          trackingCode,
          status: 'paid',
          currentStep: 0, // Será atualizado pelo TrackingUpdateService
          customerId: customer.id,
          origin: 'Sistema',
          destination: payload.customer.address.city ? 
            `${payload.customer.address.city}, ${payload.customer.address.state}` : 
            'Destino Pendente',
          items: {
            create: payload.items.map(item => ({
              title: item.title,
              quantity: item.quantity,
              unitPrice: item.unitPrice / 100 // Convertendo de centavos para reais
            }))
          }
        }
      });
      console.log(`Pedido criado: ${order.id}`);
      
      // Criar a primeira atualização de rastreamento
      const paidDate = payload.paidAt ? new Date(payload.paidAt) : new Date();
      await trackingUpdateService.createInitialTracking(order, paidDate);
      
      // Iniciar sequência de emails
      const sequenceId = await emailService.startSequence(order.id.toString());
      console.log(`Sequência de emails iniciada: ${sequenceId}`);
      
      return {
        success: true,
        trackingCode,
        orderId: order.id
      };
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  }

  async handleTransaction(payload: WebhookPayload) {
    if (payload.status !== 'paid') {
      return { 
        success: false, 
        message: 'Transação não aprovada' 
      };
    }

    try {
      const result = await this.processPayment(payload);
      return result;
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw error;
    }
  }
} 