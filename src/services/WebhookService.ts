import { PrismaClient } from '@prisma/client';
import { TrackingCodeService } from './TrackingCodeService';
import { EmailSequenceService } from './EmailSequenceService';

const prisma = new PrismaClient();
const trackingService = new TrackingCodeService();
const emailService = new EmailSequenceService();

interface WebhookPayload {
  id: number;
  amount: number;
  refundedAmount: number;
  companyId: number;
  installments: number;
  paymentMethod: string;
  status: string;
  secureId: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
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
      street: string;
      streetNumber: string;
      complement: string | null;
      zipCode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
  };
  card?: {
    brand: string;
    holderName: string;
    lastDigits: string;
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
      // Processar o pagamento e criar sequência
      console.log('Processando pagamento:', payload);
      
      // Aqui você pode adicionar a lógica real de processamento
      
      return true;
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      throw error;
    }
  }

  async handleTransaction(payload: any) {
    const { id: transactionId, customer, status } = payload;

    if (status !== 'paid') {
      return { success: false, message: 'Transação não aprovada' };
    }

    try {
      // Gera código de rastreio
      const trackingCode = await trackingService.createTrackingCode(transactionId);

      // Cria ou atualiza pedido
      const order = await prisma.order.upsert({
        where: { externalId: transactionId },
        update: {
          status: 'DISPATCHED',
          customerName: customer.name,
          customerEmail: customer.email
        },
        create: {
          externalId: transactionId,
          trackingCode,
          customerName: customer.name,
          customerEmail: customer.email,
          status: 'DISPATCHED'
        }
      });

      // Inicia sequência de emails
      await emailService.startSequence(order);

      return { 
        success: true, 
        trackingCode,
        orderId: order.id 
      };
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw error;
    }
  }
} 