export const mockTrackingData = {
  id: 1,
  amount: 500,
  status: "in_transit",
  emailSequence: {
    currentStep: 3,
    totalSteps: 3,
    lastEmailType: 'PAYMENT_REQUIRED'
  },
  customer: {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "11999999999",
    address: {
      street: "Rua das Flores",
      streetNumber: "123",
      complement: "Apto 45",
      zipCode: "01234-567",
      neighborhood: "Jardim América",
      city: "São Paulo",
      state: "SP",
      country: "Brasil"
    }
  },
  items: [
    {
      title: "Smartphone XYZ",
      quantity: 1,
      unitPrice: 500.00
    }
  ],
  delivery: {
    status: "pending",
    trackingCode: "RE123456789BR",
    createdAt: "2024-03-11T14:13:00.000Z",
    updatedAt: "2024-03-13T16:28:00.000Z",
    trackingUpdates: [
      {
        status: "Objeto Aguardando Liberação",
        location: "São Paulo, SP",
        description: "Aguardando processo de liberação",
        createdAt: "2024-03-13T16:28:00.000Z"
      },
      {
        status: "Em trânsito",
        location: "São Paulo, SP",
        description: "Objeto recebido na unidade de distribuição",
        createdAt: "2024-03-13T09:15:00.000Z"
      },
      {
        status: "Em trânsito",
        location: "São Paulo, SP",
        description: "Em preparação para envio",
        createdAt: "2024-03-12T18:42:00.000Z"
      },
      {
        status: "Em trânsito",
        location: "Curitiba, PR",
        description: "Objeto em trânsito para São Paulo/SP",
        createdAt: "2024-03-12T10:30:00.000Z"
      },
      {
        status: "Em trânsito",
        location: "Curitiba, PR",
        description: "Objeto recebido na unidade de exportação",
        createdAt: "2024-03-11T14:13:00.000Z"
      }
    ],
    estimatedDelivery: "Calculando",
    origin: "Curitiba, PR",
    destination: "São Paulo, SP"
  }
}; 