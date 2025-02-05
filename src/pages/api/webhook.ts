import { NextApiRequest, NextApiResponse } from 'next';
import { EmailSequenceService } from '../../services/EmailSequenceService';

interface WebhookPayload {
  status: string;
  customer: {
    id: number;
    email: string;
    name?: string;
  };
  id: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    // Log do payload recebido para debug
    console.log('Webhook payload:', req.body);

    let data: WebhookPayload;
    try {
      data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
      return res.status(400).json({ 
        message: 'Invalid JSON payload',
        error: e instanceof Error ? e.message : 'Unknown parsing error'
      });
    }

    // Validar payload
    if (!data || !data.status || !data.customer || !data.customer.email) {
      return res.status(400).json({ 
        message: 'Invalid payload structure',
        received: data,
        required: {
          status: 'string',
          customer: {
            id: 'number',
            email: 'string'
          },
          id: 'number'
        }
      });
    }

    if (data.status === 'paid') {
      const emailService = new EmailSequenceService();
      await emailService.startSequence({
        id: data.id,
        customer: {
          id: data.customer.id,
          email: data.customer.email,
          name: data.customer.name || 'Cliente'
        }
      });
      
      return res.status(200).json({ 
        message: 'Webhook processed successfully',
        sequence: 'started'
      });
    }

    return res.status(200).json({ 
      message: 'Webhook received but no action needed',
      status: data.status 
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 