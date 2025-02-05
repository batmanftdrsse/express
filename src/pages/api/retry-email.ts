import { NextApiRequest, NextApiResponse } from 'next';
import { EmailSequenceService } from '../../services/EmailSequenceService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { sequenceId, emailType } = req.body;

    const emailService = new EmailSequenceService();
    await emailService.retryEmail(sequenceId, emailType);

    return res.status(200).json({ message: 'Email reenviado com sucesso' });
  } catch (error) {
    console.error('Erro ao reenviar email:', error);
    return res.status(500).json({ 
      message: 'Erro ao reenviar email',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
} 