import cron from 'node-cron';
import { EmailSequenceService } from '../services/EmailSequenceService';

const emailService = new EmailSequenceService();

// Executa a cada hora
export const startEmailSequenceCron = () => {
  cron.schedule('0 * * * *', async () => {
    console.log('Processando sequência de emails...');
    try {
      await emailService.processScheduledEmails();
    } catch (error) {
      console.error('Erro ao processar emails:', error);
    }
  });
}; 