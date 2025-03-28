import { Router, Request, Response } from 'express'
import prisma from '../lib/prisma'

const router = Router()

const mapStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'waiting_payment': 'pending',
    'paid': 'paid',
    'in_transit': 'in_transit',
    'delivered': 'delivered'
  }
  return statusMap[status] || status
}

// Função para gerar um código PIX aleatório (simulação)
const generatePixCode = () => {
  return '00020126580014br.gov.bcb.pix0136a629a007-3f88-4d9f-85f2-bbb8a4ea8b9c5204000053039865802BR5925RASTREIO EXPRESS SERVICO6009SAO PAULO62070503***6304' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
}

// Rota para buscar informações de rastreio
router.get<{code: string}>('/tracking/:code', async (req, res) => {
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
        },
        customer: {
          include: {
            address: true
          }
        },
        payments: {
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
    
    // Verificar se há um pagamento pendente
    let paymentInfo = null;
    if (order.payments && order.payments.length > 0) {
      const latestPayment = order.payments[0];
      paymentInfo = {
        id: latestPayment.id,
        amount: latestPayment.amount,
        status: latestPayment.status,
        pixCode: latestPayment.pixCode,
        createdAt: latestPayment.createdAt.toISOString(),
        paidAt: latestPayment.paidAt ? latestPayment.paidAt.toISOString() : null,
      };
    }
    
    // Formatar os dados para o frontend
    const response = {
      trackingCode: order.trackingCode,
      status: mapStatus(order.status),
      currentStep: order.currentStep || 1,
      updatedAt: order.updatedAt.toISOString(),
      estimatedDelivery: order.estimatedDelivery?.toISOString() || '2025-03-21T00:00:00.000Z',
      trackingUpdates: order.trackingUpdates.map(update => ({
        status: update.status,
        date: update.createdAt.toISOString(),
        location: update.location || 'Sistema'
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      destination: order.customer?.address ? {
        recipient: order.customer.name,
        street: order.customer.address.street,
        number: order.customer.address.streetNumber,
        neighborhood: order.customer.address.neighborhood,
        city: order.customer.address.city,
        state: order.customer.address.state,
        zipCode: order.customer.address.zipCode
      } : null,
      currentStatus: mapStatus(order.status),
      payment: paymentInfo
    }

    res.json(response)
  } catch (err) {
    console.error('Erro ao buscar pedido:', err)
    res.status(500).json({ 
      error: 'Erro ao buscar informações do pedido',
      details: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined
    })
  }
})

// Rota para gerar um pagamento
router.post('/tracking/:code/payment', async (req, res) => {
  try {
    const { code } = req.params;
    const { amount } = req.body;
    
    // Validar o valor do pagamento
    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Valor de pagamento inválido'
      });
    }
    
    // Verificar se o pedido existe
    const order = await prisma.order.findFirst({
      where: { trackingCode: code }
    });
    
    if (!order) {
      return res.status(404).json({
        error: 'Pedido não encontrado'
      });
    }
    
    // Verificar se já existe um pagamento pendente
    const existingPendingPayment = await prisma.paymentTransaction.findFirst({
      where: {
        trackingCode: code,
        status: 'pending'
      }
    });
    
    if (existingPendingPayment) {
      return res.json({
        success: true,
        payment: {
          id: existingPendingPayment.id,
          amount: existingPendingPayment.amount,
          status: existingPendingPayment.status,
          pixCode: existingPendingPayment.pixCode,
          createdAt: existingPendingPayment.createdAt.toISOString(),
        }
      });
    }
    
    // Gerar código PIX
    const pixCode = generatePixCode();
    
    // Criar o registro de pagamento
    const payment = await prisma.paymentTransaction.create({
      data: {
        trackingCode: code,
        amount: parseFloat(amount.toString()),
        status: 'pending',
        pixCode: pixCode,
        orderId: order.id
      }
    });
    
    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        pixCode: payment.pixCode,
        createdAt: payment.createdAt.toISOString(),
      }
    });
    
  } catch (err) {
    console.error('Erro ao gerar pagamento:', err);
    res.status(500).json({
      error: 'Erro ao gerar pagamento',
      details: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined
    });
  }
});

// Rota para confirmar o pagamento (simulação do webhook de confirmação)
router.post('/tracking/:code/payment/:id/confirm', async (req, res) => {
  try {
    const { code, id } = req.params;
    
    // Buscar o pagamento
    const payment = await prisma.paymentTransaction.findFirst({
      where: {
        id: parseInt(id),
        trackingCode: code
      }
    });
    
    if (!payment) {
      return res.status(404).json({
        error: 'Pagamento não encontrado'
      });
    }
    
    if (payment.status === 'paid') {
      return res.json({
        success: true,
        message: 'Pagamento já foi confirmado anteriormente',
        payment: {
          id: payment.id,
          status: payment.status,
          paidAt: payment.paidAt?.toISOString()
        }
      });
    }
    
    // Atualizar o status do pagamento
    const updatedPayment = await prisma.paymentTransaction.update({
      where: { id: payment.id },
      data: {
        status: 'paid',
        paidAt: new Date()
      }
    });
    
    // Atualizar o status do pedido
    await prisma.order.update({
      where: { id: payment.orderId! },
      data: { status: 'paid' }
    });
    
    res.json({
      success: true,
      message: 'Pagamento confirmado com sucesso',
      payment: {
        id: updatedPayment.id,
        status: updatedPayment.status,
        paidAt: updatedPayment.paidAt?.toISOString()
      }
    });
    
  } catch (err) {
    console.error('Erro ao confirmar pagamento:', err);
    res.status(500).json({
      error: 'Erro ao confirmar pagamento',
      details: process.env.NODE_ENV === 'development' ? (err as Error).message : undefined
    });
  }
});

export default router 