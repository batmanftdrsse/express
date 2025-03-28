import { startEmailSequenceCron } from './jobs/emailSequence';
import { startTrackingUpdateCron } from './jobs/trackingUpdateJob';

// ... seu código existente ...

// Inicia o cronjob
startEmailSequenceCron();
startTrackingUpdateCron();

console.log('Jobs inicializados: email, rastreamento'); 