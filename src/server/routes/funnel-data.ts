import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export async function getFunnelData(req: Request, res: Response) {
  try {
    const funnelData = await prisma.$transaction(async (tx) => {
      // ... resto do código
    });
    res.json(funnelData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do funil' });
  }
} 