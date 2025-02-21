import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

function generateTrackingCode() {
  const prefix = 'RAE'
  const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
  return `${prefix}${number}`
}

async function main() {
  console.log('Starting seed...')
  try {
    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.upsert({
      where: { email: 'admin@rastreioexpress.com' },
      update: {},
      create: {
        email: 'admin@rastreioexpress.com',
        passwordHash: hashedPassword,
        role: 'admin'
      }
    })
    console.log('User created:', user)

    // Criar pedido de exemplo
    const trackingCode = generateTrackingCode()
    const order = await prisma.order.create({
      data: {
        trackingCode,
        externalId: `EXT${Date.now()}`,
        status: 'IN_TRANSIT',
        currentStep: 2,
        customerName: 'João Silva',
        customerEmail: 'joao@exemplo.com',
        customer: {
          create: {
            name: 'João Silva',
            email: 'joao@exemplo.com',
            phone: '11999999999',
            document: {
              create: {
                number: '12345678910',
                type: 'cpf'
              }
            },
            address: {
              create: {
                street: 'Rua Exemplo',
                streetNumber: '123',
                zipCode: '12345678',
                neighborhood: 'Centro',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
              }
            }
          }
        },
        trackingUpdates: {
          create: [
            {
              status: 'PENDING',
              description: 'Pedido registrado',
              location: 'São Paulo, SP'
            }
          ]
        }
      }
    })
    console.log('Order created:', order)
    console.log('Pedido criado com código:', trackingCode)

    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error during seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  }) 