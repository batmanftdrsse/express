import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

// Inicialize o cliente Prisma fora da função main
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

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