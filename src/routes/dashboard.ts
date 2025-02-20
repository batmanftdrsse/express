import { Router } from 'express';
import prisma from '../lib/prisma';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

const router = Router();

router.get('/dashboard', async (req, res) => {
  try {
    const startDate = req.query.start_date ? parseISO(req.query.start_date as string) : new Date();
    const endDate = req.query.end_date ? parseISO(req.query.end_date as string) : new Date();

    // Por enquanto retorna dados mockados
    res.json({
      sales: {
        total: 61365.89,
        averageTicket: 47.83,
        totalOrders: 1283
      },
      funnel: {
        totalLeads: 85420,
        convertedLeads: 1283
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 