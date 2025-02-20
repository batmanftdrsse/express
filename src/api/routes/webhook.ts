import { Router } from 'express';
import { WebhookService } from '../../services/WebhookService';
import { validateWebhookPayload } from '../../utils/validators';
import { WebhookPayload } from '../../types/webhook';

const router = Router();
const webhookService = new WebhookService();

router.post('/webhook/payment', async (req, res) => {
  try {
    console.log('Webhook recebido:', req.body);
    
    // Valida o payload
    const payload = validateWebhookPayload(req.body);
    
    // Processa o pagamento e inicia sequência de emails
    const result = await webhookService.handleTransaction(payload);
    
    res.json({
      success: true,
      trackingCode: result.trackingCode,
      orderId: result.orderId
    });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router; 