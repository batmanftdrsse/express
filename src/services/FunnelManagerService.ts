import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FunnelStep {
  step_number: number;
  email_subject: string;
  email_template: string;
  delay_hours: number;
}

interface CreateFunnelTemplate {
  name: string;
  payment_method: string;
  steps: FunnelStep[];
}

interface FunnelTemplate {
  id: number;
  name: string;
  payment_method: string | null;
  steps: FunnelStep[];
}

export class FunnelManagerService {
  public async createFunnel(template: CreateFunnelTemplate) {
    const funnel = await prisma.funnelTemplate.create({
      data: {
        name: template.name,
        payment_method: template.payment_method,
        steps: {
          create: template.steps
        }
      }
    });
    return funnel;
  }

  public async getFunnelForPayment(paymentMethod: string) {
    // Procura um funil específico para o método de pagamento
    // ou um funil genérico se não encontrar
    const funnel = await prisma.funnelTemplate.findFirst({
      where: {
        OR: [
          { payment_method: paymentMethod },
          { payment_method: null }
        ],
        is_active: true
      },
      include: {
        steps: {
          orderBy: { step_number: 'asc' }
        }
      }
    });
    return funnel;
  }
} 