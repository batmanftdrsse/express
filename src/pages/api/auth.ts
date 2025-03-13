import { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '../../services/AuthService';

const authService = new AuthService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { email, password } = req.body;
    const auth = await authService.login(email, password);
    res.status(200).json(auth);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
} 