export const emailTemplates = {
  WELCOME: (data: { name: string }) => ({
    subject: 'Bem-vindo ao RastreioExpress!',
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>Olá ${data.name}!</h1>
        <p>Seja bem-vindo ao RastreioExpress.</p>
        <p>Estamos felizes em tê-lo conosco!</p>
      </div>
    `
  }),

  ORDER_CONFIRMATION: (data: { orderNumber: string, items: any[] }) => ({
    subject: `Pedido #${data.orderNumber} confirmado`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h1>Pedido Confirmado</h1>
        <p>Seu pedido #${data.orderNumber} foi confirmado.</p>
        <!-- ... mais detalhes do pedido ... -->
      </div>
    `
  })
  // ... outros templates
} 