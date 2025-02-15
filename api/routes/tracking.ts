import { Router } from 'express'
import prisma from '../../src/lib/prisma'

const router = Router()

// Rota para buscar informações de rastreio
router.get('/tracking/:code', async (req, res) => {
  try {
    const { code } = req.params
    console.log('Buscando tracking:', code)

    const orders = await prisma.order.findMany()
    console.log('Todos os pedidos:', orders)

    const order = await prisma.order.findUnique({
      where: { trackingCode: code },
      include: {
        trackingUpdates: true,
        customer: {
          include: {
            document: true,
            address: true
          }
        },
        transaction: {
          include: {
            card: true,
            items: true
          }
        }
      }
    })

    console.log('Resultado da busca:', order)

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' })
    }

    res.json(order)
  } catch (error) {
    console.error('Erro ao buscar tracking:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router 