import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '../../../middleware/authMiddleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Sua lógica aqui
}

export default authMiddleware(handler); 