import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { startOfDay, endOfDay, parseISO } from 'date-fns'

const router = Router()
const prisma = new PrismaClient()

router.get('/dashboard', async (req, res) => {
  try {
    const startDate = parseISO(req.query.start_date as string)
    const endDate = parseISO(req.query.end_date as string)

    const [
      orders,
      emailStats,
      dailySales
    ] = await Promise.all([
      // Busca pedidos no período
      prisma.order.findMany({
        where: {
          createdAt: {
            gte: startOfDay(startDate),
            lte: endOfDay(endDate)
          }
        }
      }),

      // Busca estatísticas de email
      prisma.emailLog.findMany({
        where: {
          createdAt: {
            gte: startOfDay(startDate),
            lte: endOfDay(endDate)
          }
        }
      }),

      // Busca vendas diárias
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM orders
        WHERE created_at BETWEEN ${startDate} AND ${endDate}
        GROUP BY DATE(created_at)
        ORDER BY date
      `
    ])

    // Calcula as métricas
    const totalSales = orders.length
    const averageTicket = totalSales > 0 
      ? orders.reduce((acc, order) => acc + order.amount, 0) / totalSales 
      : 0

    res.json({
      sales: {
        total: totalSales,
        averageTicket,
        totalOrders: orders.length
      },
      funnel: {
        totalLeads: orders.length,
        nonTaxedLeads: orders.filter(o => o.status !== 'CUSTOMS').length,
        taxedLeads: orders.filter(o => o.status === 'CUSTOMS').length,
        convertedLeads: orders.filter(o => o.status === 'DELIVERED').length
      },
      costs: {
        platformFees: totalSales * 0.05, // 5% de taxa
        emailCosts: emailStats.length * 0.01, // R$0,01 por email
        smsCosts: 0 // Implementar depois
      },
      dailySales
    })
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router 