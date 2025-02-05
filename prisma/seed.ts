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

    console.log('Created user:', user)

    // Criar sequências de teste
    for (let i = 1; i <= 5; i++) {
      const sequence = await prisma.emailSequences.create({
        data: {
          customer_id: i,
          order_id: i,
          customer_email: `customer${i}@example.com`,
          customer_name: `Customer ${i}`,
          current_step: Math.floor(Math.random() * 3) + 1,
          status: i % 2 === 0 ? 'active' : 'completed',
          last_email_sent_at: new Date(),
        },
      })

      // Criar logs de email para cada sequência
      await prisma.emailLogs.createMany({
        data: [
          {
            sequence_id: sequence.id,
            step: 1,
            email_type: 'welcome',
            status: 'sent',
            customer_email: sequence.customer_email,
          },
          {
            sequence_id: sequence.id,
            step: 2,
            email_type: 'follow_up',
            status: i % 2 === 0 ? 'pending' : 'sent',
            customer_email: sequence.customer_email,
          },
        ],
      })
    }

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