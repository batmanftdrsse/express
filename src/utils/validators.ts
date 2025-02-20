import { WebhookPayload } from '../types/webhook';

export function validateWebhookPayload(data: any): WebhookPayload {
  if (!data) {
    throw new Error('Payload inválido: dados ausentes');
  }

  const requiredFields = [
    'id',
    'amount',
    'status',
    'paymentMethod',
    'customer',
    'paidAt'
  ];

  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Payload inválido: campo ${field} ausente`);
    }
  }

  // Valida campos do customer
  const customerFields = [
    'name',
    'email',
    'phone',
    'document',
    'address'
  ];

  for (const field of customerFields) {
    if (!(field in data.customer)) {
      throw new Error(`Payload inválido: campo customer.${field} ausente`);
    }
  }

  return data as WebhookPayload;
} 