import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Starting seed...')
    
    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    console.log('Password hashed')
    
    const user = await prisma.user.upsert({
      where: { email: 'admin@rastreioexpress.com' },
      update: {},
      create: {
        email: 'admin@rastreioexpress.com',
        passwordHash: hashedPassword,
        role: 'admin'
      },
    })

    console.log('Created/Updated user:', user)

    // Criar pedido de exemplo
    const order = await prisma.order.create({
      data: {
        trackingCode: 'RAE000123',
        externalId: 'EXT123',
        customerName: 'João Silva',
        customerEmail: 'joao@exemplo.com',
        status: 'IN_TRANSIT',
        currentStep: 2,
        trackingUpdates: {
          create: [
            {
              status: 'PENDING',
              description: 'Pedido registrado',
              location: 'São Paulo, SP'
            },
            {
              status: 'IN_TRANSIT',
              description: 'Em trânsito para o destino',
              location: 'Rio de Janeiro, RJ'
            }
          ]
        }
      }
    })

    // Criar sequência de email para o pedido
    await prisma.emailSequence.create({
      data: {
        orderId: order.id,
        status: 'ACTIVE',
        emailLogs: {
          create: [
            {
              email: order.customerEmail,
              type: 'ORDER_CONFIRMATION',
              status: 'SENT',
              metadata: {
                orderNumber: order.trackingCode
              }
            }
          ]
        }
      }
    })

    console.log('Pedido de exemplo criado:', {
      ...order,
      emailSequence: await prisma.emailSequence.findUnique({
        where: { orderId: order.id },
        include: { emailLogs: true }
      })
    })

    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error during seed:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 