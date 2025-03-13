export const mockDashboardStats = {
  totalOrders: 150,
  emailsSent: 450,
  pendingDeliveries: 23,
  recentOrders: [
    {
      id: "1",
      trackingCode: "BR123456789",
      status: "Em Trânsito",
      createdAt: "2024-03-13T10:00:00Z"
    },
    {
      id: "2",
      trackingCode: "BR987654321",
      status: "Pendente",
      createdAt: "2024-03-12T15:30:00Z"
    },
    // Adicione mais pedidos mock aqui
  ],
  ordersByStatus: [
    { status: "Em Trânsito", count: 45 },
    { status: "Pendente", count: 23 },
    { status: "Entregue", count: 82 }
  ]
}; 