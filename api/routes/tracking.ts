import { Router } from 'express'
import prisma from '../lib/prisma'

const router = Router()

// Rota para buscar informações de rastreio
router.get('/tracking/:code', async (req, res) => {
  try {
    const { code } = req.params
    console.log('Recebida requisição de tracking para código:', code)
    
    const order = await prisma.order.findFirst({
      where: {
        trackingCode: code
      },
      include: {
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
    res.json({
      trackingCode: order.trackingCode,
      status: order.status,
      currentStep: order.currentStep || 1,
      trackingUpdates: order.trackingUpdates || []
    })
  } catch (error) {
    console.error('Erro ao buscar pedido:', error)
    res.status(500).json({ 
      error: 'Erro ao buscar informações do pedido',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

export default router 