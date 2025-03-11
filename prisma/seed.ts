import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function cleanDatabase() {
  // Limpa os dados existentes na ordem correta
  await prisma.emailLog.deleteMany()
  await prisma.emailSequence.deleteMany()
  await prisma.funnelStep.deleteMany()
  await prisma.emailTemplate.deleteMany()
  await prisma.order.deleteMany()
  await prisma.customer.deleteMany()
}

async function main() {
  console.log('Limpando banco de dados...')
  await cleanDatabase()
  
  console.log('Criando templates de email...')
  try {
    const templates = await Promise.all([
      prisma.emailTemplate.create({
        data: {
          name: 'Welcome Email',
          subject: 'Bem-vindo ao RastreioExpress',
          content: 'Olá {customerName}, bem-vindo ao RastreioExpress!',
          delayHours: 0,
          isActive: true
        }
      }),
      prisma.emailTemplate.create({
        data: {
          name: 'Order Confirmation',
          subject: 'Pedido Confirmado',
          content: 'Seu pedido {orderNumber} foi confirmado!',
          delayHours: 1,
          isActive: true
        }
      }),
      prisma.emailTemplate.create({
        data: {
          name: 'Shipping Update',
          subject: 'Atualização do Envio',
          content: 'Seu pedido {orderNumber} está a caminho!',
          delayHours: 24,
          isActive: true
        }
      })
    ])

    console.log('Criando cliente de teste...')
    const customer = await prisma.customer.create({
      data: {
        name: 'Cliente Teste',
        email: 'nicolasfranciscosouzafernando@gmail.com'
      }
    })

    console.log('Criando pedido de teste...')
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        trackingCode: 'TEST123456',
        status: 'pending',
        amount: 199.99
      }
    })

    console.log('Dados criados com sucesso:', {
      templates,
      customer,
      order
    })
  } catch (error) {
    console.error('Erro ao criar dados:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 