import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanDatabase() {
  try {
    // Deletar na ordem correta para respeitar as foreign keys
    await prisma.trackingUpdate.deleteMany()
    await prisma.emailLog.deleteMany()
    await prisma.emailSequence.deleteMany()
    await prisma.item.deleteMany()
    await prisma.card.deleteMany()
    await prisma.transaction.deleteMany()
    await prisma.order.deleteMany()
    await prisma.address.deleteMany()
    await prisma.document.deleteMany()
    await prisma.customer.deleteMany()
    await prisma.user.deleteMany()
    
    console.log('Database cleaned successfully')
  } catch (error) {
    console.error('Error cleaning database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

cleanDatabase() 