import { Router } from 'express';
import { WebhookService } from '../../services/WebhookService';
import { validateWebhookPayload } from '../../utils/validators';

const router = Router();
const webhookService = new WebhookService();

router.post('/webhook/payment', async (req, res) => {
  try {
    console.log('Webhook recebido:', req.body);
    
    // Valida o payload
    // Nota: Aqui você também poderia adicionar validação de segurança com HMAC ou JWT
    // para garantir que a requisição vem realmente do seu gateway de pagamento
    const payload = req.body;
    
    // Log para debug
    console.log(`Recebido webhook do gateway para transação ${payload.id}, status: ${payload.status}`);
    
    // Processar apenas pagamentos aprovados
    if (payload.status === 'paid') {
      // Processa o pagamento e inicia sequência de emails e rastreamento
      const result = await webhookService.handleTransaction(payload);
      
      return res.json({
        success: true,
        trackingCode: result.trackingCode,
        orderId: result.orderId,
        message: 'Pedido processado com sucesso'
      });
    } else {
      console.log(`Ignorando webhook com status ${payload.status}`);
      return res.json({
        success: true,
        message: `Webhook com status ${payload.status} recebido, mas não processado`
      });
    }
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router; 