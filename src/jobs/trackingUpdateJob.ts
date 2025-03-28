import { scheduleJob } from 'node-schedule';
import { TrackingUpdateService } from '../services/TrackingUpdateService';

const trackingUpdateService = new TrackingUpdateService();

export function startTrackingUpdateCron() {
  // Executar a cada 1 hora para verificar e atualizar o status dos rastreamentos
  scheduleJob('0 * * * *', async () => {
    try {
      console.log('Iniciando verificação de atualizações de rastreamento');
      await trackingUpdateService.checkAndUpdateTrackingStatus();
      console.log('Verificação de atualizações de rastreamento concluída');
    } catch (error) {
      console.error('Erro ao executar job de atualização de rastreamento:', error);
    }
  });
  
  console.log('Job de atualização de rastreamento agendado com sucesso');
}

// Função para teste imediato, fora do agendamento
export async function runTrackingUpdateNow() {
  try {
    console.log('Executando atualização de rastreamento imediatamente');
    await trackingUpdateService.checkAndUpdateTrackingStatus();
    console.log('Atualização de rastreamento concluída');
  } catch (error) {
    console.error('Erro ao executar atualização de rastreamento:', error);
  }
} 