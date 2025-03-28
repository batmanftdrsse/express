import { rest } from 'msw'
import { addDays, subDays, format, differenceInDays } from 'date-fns'
import { useState } from 'react'

const trackingSteps = [
  {
    step: 1,
    status: 'Objeto postado',
    location: 'CHINA',
  },
  {
    step: 2,
    status: 'Objeto em transferência',
    location: 'CHINA',
  },
  {
    step: 3,
    status: 'Chegou ao Brasil',
    location: 'SÃO PAULO - SP',
  },
  {
    step: 4,
    status: 'Objeto recebido no Centro de Distribuição',
    location: 'SÃO PAULO - SP',
  },
  {
    step: 5,
    status: 'Pacote retido - regularize imediatamente',
    location: 'CURITIBA - PR',
  }
]

const calculateTrackingHistory = (currentStep: number) => {
  const updates = []
  const today = new Date()
  
  for (let i = 0; i < currentStep; i++) {
    const step = trackingSteps[i]
    updates.push({
      status: step.status,
      date: format(subDays(today, currentStep - i), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      location: step.location,
      description: `Atualização: ${step.status}`
    })
  }

  return updates.reverse()
}

// IMPORTANTE: Não adicione handlers para APIs externas como a AdsPay aqui.
// Estamos usando um proxy no Vite para lidar com requisições externas e contornar problemas de CORS.
// As requisições para '/adspay/*' são redirecionadas para 'https://api.adspayhub.com/*'.

export const handlers = [
  // Passthrough para a rota de login - permitir que a requisição vá para o servidor real
  rest.post('http://localhost:3001/auth/login', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição de login e passando para o servidor real')
    return req.passthrough()
  }),
  
  // Passthrough para rotas administrativas
  rest.get('http://localhost:3001/api/admin/*', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição admin e passando para o servidor real')
    return req.passthrough()
  }),
  
  rest.post('http://localhost:3001/api/admin/*', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição admin e passando para o servidor real')
    return req.passthrough()
  }),
  
  rest.patch('http://localhost:3001/api/admin/*', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição admin e passando para o servidor real')
    return req.passthrough()
  }),
  
  rest.delete('http://localhost:3001/api/admin/*', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição admin e passando para o servidor real')
    return req.passthrough()
  }),
  
  // Passthrough para a rota de estatísticas do dashboard
  rest.get('http://localhost:3001/api/dashboard/stats', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição de dashboard stats e passando para o servidor real.')
    return req.passthrough()
  }),
  
  // Tracking endpoint
  rest.get('/api/tracking/:trackingCode', (req, res, ctx) => {
    console.log('MSW interceptou requisição para tracking:', req.params.trackingCode)
    const trackingCode = req.params.trackingCode as string
    const today = new Date()

    // Extract the numeric part from tracking code (1-5)
    const trackingNumber = parseInt(trackingCode.replace(/\D/g, ''))
    
    // Calculate current step based on tracking number (1-5)
    const currentStep = Math.min(trackingNumber, 5)
    
    // Status logic: first 4 days in_transit, then pending
    const status = currentStep < 5 ? 'in_transit' : 'pending'
    
    const trackingUpdates = calculateTrackingHistory(currentStep)
    
    // Estimated delivery: 15 days from step 5 (pending status)
    const estimatedDelivery = status === 'pending' 
      ? format(addDays(today, 15), "yyyy-MM-dd'T'HH:mm:ss'Z'")
      : format(addDays(today, 5 - currentStep), "yyyy-MM-dd'T'HH:mm:ss'Z'")

    const response = {
      id: trackingNumber.toString(),
      trackingCode,
      status,
      currentStep,
      updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      estimatedDelivery,
      destination: {
        recipient: 'João da Silva',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Jardim América',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      trackingUpdates
    }

    console.log('MSW retornando resposta:', response)

    return res(
      ctx.status(200),
      ctx.json(response)
    )
  }),
  
  // Handler para o webhook de pagamento (simulação)
  rest.post('/api/webhook/payment', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Payment webhook received',
        status: 'success'
      })
    )
  }),
  
  // Mock para /email/metrics (para email-funnel.tsx)
  rest.get('/api/email/metrics', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        total: 1000,
        opened: 750,
        clicked: 500,
        bounced: 50
      })
    )
  }),
  
  // Mock para dashboard com e sem prefixo api
  rest.get('/api/dashboard', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sales: {
          today: 1500,
          yesterday: 1200,
          thisWeek: 8500,
          lastWeek: 7800
        },
        funnel: {
          visitors: 1000,
          leads: 500,
          customers: 100
        }
      })
    )
  }),
  
  // Versões com prefixo /api para todas as rotas
  /* Comentando o mock de dashboard/stats para usar a versão real
  rest.get('/api/dashboard/stats', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        totalOrders: 1500,
        revenue: 75000,
        averageOrderValue: 50,
        returningCustomers: 300
      })
    )
  }),
  */
  
  rest.get('/api/dashboard/email-sms-stats', (req, res, ctx) => {
    console.log('MSW interceptou requisição para: /api/dashboard/email-sms-stats')
    
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        emailsEnviados: 867,
        emailsNaoEntregues: 32,
        smsEnviados: 425,
        smsNaoEntregues: 15,
        emailDeliveryRate: 96.3,
        smsDeliveryRate: 96.5
      })
    )
  }),
  
  rest.get('/api/orders/recent', (req, res, ctx) => {
    console.log('MSW interceptou requisição para: /api/orders/recent')
    
    // Extrair os parâmetros de paginação
    const page = parseInt(req.url.searchParams.get('page') || '1')
    const limit = parseInt(req.url.searchParams.get('limit') || '10')
    
    // Criar uma lista de pedidos fictícios
    const allOrders = Array.from({ length: 23 }, (_, index) => ({
      id: String(index + 1),
      trackingCode: `RE${String(Math.floor(Math.random() * 1000000000)).padStart(9, '0')}BR`,
      status: ['Aguardando', 'Em Trânsito', 'Entregue', 'Pago', 'Recusado'][Math.floor(Math.random() * 5)],
      createdAt: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 10))).toISOString()
    }))
    
    // Calcular a página atual de pedidos
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const currentPageOrders = allOrders.slice(startIndex, endIndex)
    
    const totalPages = Math.ceil(allOrders.length / limit)
    
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        orders: currentPageOrders,
        total: allOrders.length,
        pages: totalPages,
        currentPage: page
      })
    )
  }),
  
  rest.get('/api/funnel-data', (req, res, ctx) => {
    console.log('MSW interceptou requisição para: /api/funnel-data')
    
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.json({
        totalSequences: 1250,
        activeSequences: 770,
        completedSequences: 135,
        successRate: 10.8
      })
    )
  }),
  
  // Ignorar requisições para configuração de API
  rest.get('http://localhost:3001/api/admin/api-config', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição de configuração de API e passando para o servidor real.')
    return req.passthrough()
  }),
  
  // Ignorar requisições para atualização de configuração de API
  rest.post('http://localhost:3001/api/admin/api-config', (req, res, ctx) => {
    console.log('MSW: Ignorando requisição de atualização de configuração de API e passando para o servidor real.')
    return req.passthrough()
  }),
] 