import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { customAlphabet } from 'nanoid'

// Inicialize o cliente Prisma fora da função main
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const generateTrackingCode = () => {
  const nanoid = customAlphabet('1234567890', 6)
  return `RAE${nanoid()}`
}

async function main() {
  try {
    console.log('Starting seed...')
    
    // Criar usuário admin primeiro
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const user = await prisma.user.upsert({
      where: { email: 'admin@rastreioexpress.com' },
      update: {},
      create: {
        email: 'admin@rastreioexpress.com',
        passwordHash: hashedPassword,
        role: 'admin'
      },
    })
    console.log('User created:', user)

    // Criar pedido de exemplo
    const order = await prisma.order.create({
      data: {
        trackingCode: 'RAE000123',
        externalId: `EXT${Date.now()}`,
        customerName: 'João Silva',
        customerEmail: 'joao@exemplo.com',
        status: 'IN_TRANSIT',
        currentStep: 2,
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
                state: 'SP'
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
    console.log('Pedido criado com código:', order.trackingCode)

    console.log('Seed completed successfully')
  } catch (error) {
    console.error('Error during seed:', error)
    throw error
  } finally {
    // Importante: desconecte o cliente no final
    await prisma.$disconnect()
  }
}

// Execute a função main
main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  }) 