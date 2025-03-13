import { Router } from 'express'
import { startOfDay, endOfDay, parseISO } from 'date-fns'
import prisma from '../lib/prisma'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.get('/dashboard', async (req, res) => {
  try {
    const startDate = parseISO(req.query.start_date as string)
    const endDate = parseISO(req.query.end_date as string)

    // Por enquanto, vamos retornar dados mockados
    // até termos a estrutura do banco configurada
    res.json({
      sales: {
        total: 61365.89,
        averageTicket: 47.83,
        totalOrders: 1283
      },
      funnel: {
        totalLeads: 85420,
        nonTaxedLeads: 46670,
        taxedLeads: 38750,
        convertedLeads: 11625
      },
      costs: {
        platformFees: 170538.75,
        emailCosts: 427.10,
        smsCosts: 3100.00
      },
      revenue: {
        releaseFee: 405712.50,
        shippingFee: 162750.00,
        averageTicket: 47.83
      },
      dailySales: [
        { date: '2025-01-08', value: 150 },
        { date: '2025-01-09', value: 230 },
        { date: '2025-01-10', value: 224 },
        { date: '2025-01-11', value: 218 },
        { date: '2025-01-12', value: 135 },
        { date: '2025-01-13', value: 147 },
        { date: '2025-01-14', value: 260 }
      ]
    })
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

router.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalOrders,
      emailsSent,
      pendingDeliveries,
      recentOrders,
      ordersByStatus
    ] = await Promise.all([
      prisma.order.count(),
      prisma.emailLog.count({ where: { status: 'SENT' } }),
      prisma.order.count({ where: { status: 'pending' } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          trackingCode: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      })
    ]);

    const stats = {
      totalOrders,
      emailsSent,
      pendingDeliveries,
      recentOrders,
      ordersByStatus: ordersByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

export default router 