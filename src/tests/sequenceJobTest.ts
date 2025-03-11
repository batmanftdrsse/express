import { EmailSequenceJob } from '../jobs/emailSequenceJob';

async function testJob() {
  const job = new EmailSequenceJob();
  
  // Iniciar o job com intervalo de 1 minuto para teste
  job.start(1);

  // Manter o processo rodando por 5 minutos
  await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
}

testJob(); 