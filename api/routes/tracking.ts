import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Rota para buscar informações de rastreio
router.get('/tracking/:code', async (req, res) => {
  try {
    const { code } = req.params
    console.log('Buscando pedido:', code)

    const order = await prisma.order.findUnique({
      where: { 
        trackingCode: code 
      },
      include: {
        customer: {
          include: {
            address: true,
            document: true
          }
        },
        trackingUpdates: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!order) {
      console.log('Pedido não encontrado:', code)
      return res.status(404).json({ 
        error: 'Pedido não encontrado',
        code 
      })
    }

    console.log('Pedido encontrado:', order)
    res.json(order)
  } catch (error) {
    console.error('Erro ao buscar pedido:', error)
    res.status(500).json({ 
      error: 'Erro ao buscar informações do pedido',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

export default router 