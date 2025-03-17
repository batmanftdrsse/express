import { rest } from 'msw'

export const handlers = [
  rest.get('/api/tracking/:trackingCode', (req, res, ctx) => {
    const { trackingCode } = req.params
    console.log('MSW interceptou requisição para:', trackingCode)
    
    // Dados mockados dinâmicos baseados no código de rastreio
    let status = 'waiting_payment'
    let currentStep = 1

    // Simular diferentes status baseados no código
    if (trackingCode === 'RE963741852BR') {
      status = 'waiting_payment'
      currentStep = 1
    } else if (trackingCode === 'RE258963147BR') {
      status = 'paid'
      currentStep = 2
    } else if (trackingCode === 'RE147852369BR') {
      status = 'in_transit'
      currentStep = 3
    }

    const trackingData = {
      id: 13,
      trackingCode: trackingCode,
      status,
      currentStep,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerId: 13,
      origin: null,
      destination: {
        recipient: 'Maria Silva',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Jardim América',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      estimatedDelivery: '2024-03-18',
      urgentDelivery: false,
      trackingUpdates: []
    }

    console.log('MSW retornando dados:', trackingData)
    return res(
      ctx.delay(500), // Adiciona um delay para simular rede
      ctx.status(200),
      ctx.json(trackingData)
    )
  })
] 