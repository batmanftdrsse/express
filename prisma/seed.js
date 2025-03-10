const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const templates = [
  {
    name: "CONFIRMATION",
    subject: "Confirmação da sua compra",
    content: "<h1>Olá!</h1><p>Sua compra foi confirmada!</p><p>Você pode acompanhar seu pedido usando o código de rastreio: {{trackingCode}}</p>",
    delayHours: 0,
    is_active: true
  },
  {
    name: "TRACKING",
    subject: "Seu código de rastreio",
    content: "<h1>Pedido em processamento</h1><p>Use o código {{trackingCode}} para acompanhar o status do seu pedido.</p>",
    delayHours: 1,
    is_active: true
  },
  {
    name: "DELIVERY_UPDATE",
    subject: "Pedido Entregue",
    content: "<h1>Pedido Finalizado</h1><p>Seu pedido foi entregue com sucesso.</p><p>Código: {{trackingCode}}</p>",
    delayHours: 48,
    is_active: true
  }
]

async function seed() {
  console.log('Iniciando seed...')
  
  for (const template of templates) {
    try {
      const result = await prisma.emailTemplate.create({
        data: template
      })
      console.log(`Template ${template.name} criado:`, result)
    } catch (error) {
      console.error(`Erro ao criar template ${template.name}:`, error)
    }
  }
  
  await prisma.$disconnect()
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0))
