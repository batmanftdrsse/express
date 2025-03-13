import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function cleanDatabase() {
  await prisma.emailLog.deleteMany()
  await prisma.emailSequence.deleteMany()
  await prisma.funnelStep.deleteMany()
  await prisma.emailTemplate.deleteMany()
  await prisma.trackingUpdate.deleteMany()
  await prisma.item.deleteMany()
  await prisma.order.deleteMany()
  await prisma.address.deleteMany()
  await prisma.customerDocument.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.user.deleteMany()
}

async function main() {
  console.log('Limpando banco de dados...')
  await cleanDatabase()
  
  // Criar usuário admin
  console.log('Criando usuário admin...')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@rastreioexpress.com' },
    update: {},
    create: {
      email: 'admin@rastreioexpress.com',
      password: hashedPassword,
      name: 'Administrador'
    }
  })
  console.log('Usuário admin criado:', admin)

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
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "11999999999",
        address: {
          create: {
            street: "Rua das Flores",
            streetNumber: "123",
            complement: "Apto 45",
            zipCode: "01234-567",
            neighborhood: "Jardim América",
            city: "São Paulo",
            state: "SP",
            country: "Brasil"
          }
        }
      }
    })

    console.log('Criando pedido de teste...')
    const order = await prisma.order.create({
      data: {
        trackingCode: "RE123456789BR",
        status: "in_transit",
        currentStep: 3,
        customerId: customer.id,
        origin: "Curitiba, PR",
        destination: "São Paulo, SP",
        estimatedDelivery: new Date("2024-03-14"),
        urgentDelivery: true,
        items: {
          create: [
            {
              title: "Smartphone XYZ",
              quantity: 1,
              unitPrice: 500.00
            }
          ]
        },
        trackingUpdates: {
          create: [
            {
              status: "Objeto entregue ao destinatário",
              location: "São Paulo, SP",
              description: "Entrega realizada com sucesso",
              createdAt: new Date("2024-03-13T16:28:00.000Z")
            },
            {
              status: "Objeto saiu para entrega ao destinatário",
              location: "São Paulo, SP",
              description: "Em rota de entrega",
              createdAt: new Date("2024-03-13T09:15:00.000Z")
            },
            {
              status: "Objeto chegou na unidade de distribuição",
              location: "São Paulo, SP",
              description: "Em preparação para saída para entrega",
              createdAt: new Date("2024-03-12T18:42:00.000Z")
            },
            {
              status: "Objeto em trânsito",
              location: "Curitiba, PR",
              description: "Objeto encaminhado para São Paulo/SP",
              createdAt: new Date("2024-03-12T10:30:00.000Z")
            },
            {
              status: "Objeto postado",
              location: "Curitiba, PR",
              description: "Objeto recebido na unidade de exportação",
              createdAt: new Date("2024-03-11T14:13:00.000Z")
            }
          ]
        }
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