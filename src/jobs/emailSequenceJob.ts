import { PrismaClient } from '@prisma/client';
import { EmailSequenceService } from '../services/EmailSequenceService';

export class EmailSequenceJob {
  private prisma: PrismaClient;
  private sequenceService: EmailSequenceService;

  constructor() {
    this.prisma = new PrismaClient();
    this.sequenceService = new EmailSequenceService();
  }

  async processActiveSequences() {
    try {
      // Buscar todas as sequências ativas com seus templates
      const activeSequences = await this.prisma.emailSequence.findMany({
        where: {
          status: 'active'
        },
        include: {
          emailLogs: {
            orderBy: {
              sentAt: 'desc'
            },
            take: 1
          }
        }
      });

      console.log(`Encontradas ${activeSequences.length} sequências ativas`);

      // Processar cada sequência
      for (const sequence of activeSequences) {
        try {
          const lastEmail = sequence.emailLogs[0];
          
          if (!lastEmail) {
            console.log(`Sequência ${sequence.id} ainda não tem emails enviados`);
            await this.sequenceService.sendNextEmail(sequence.id);
            continue;
          }

          const hoursElapsed = (Date.now() - lastEmail.sentAt.getTime()) / (1000 * 60 * 60);
          console.log(`Sequência ${sequence.id}: ${hoursElapsed.toFixed(2)} horas desde o último email`);

          // Verificar se já passou tempo suficiente desde o último email
          const template = await this.prisma.emailTemplate.findFirst({
            where: {
              funnelSteps: {
                some: {
                  orderId: sequence.orderId
                }
              }
            },
            orderBy: {
              delayHours: 'asc'
            },
            skip: sequence.currentStep - 1,
            take: 1
          });

          if (!template) {
            console.log(`Nenhum template encontrado para o passo ${sequence.currentStep}`);
            continue;
          }

          if (hoursElapsed >= template.delayHours) {
            console.log(`Enviando próximo email da sequência ${sequence.id}`);
            await this.sequenceService.sendNextEmail(sequence.id);
          } else {
            console.log(`Aguardando ${template.delayHours - hoursElapsed.toFixed(2)} horas para o próximo email`);
          }
        } catch (error) {
          console.error(`Erro ao processar sequência ${sequence.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Erro ao processar sequências:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Método para iniciar o job
  start(intervalMinutes = 60) {
    console.log(`Iniciando job de sequência de emails (intervalo: ${intervalMinutes} minutos)`);
    
    // Executar imediatamente na primeira vez
    this.processActiveSequences();

    // Agendar execuções posteriores
    setInterval(() => {
      this.processActiveSequences();
    }, intervalMinutes * 60 * 1000);
  }
} 