import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { seedCustomers } from './seeds/customers'

const prisma = new PrismaClient()

async function cleanDatabase() {
  console.log('Limpando banco de dados...')
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
  console.log('Iniciando seed...')
  
  // Limpar banco de dados primeiro
  await cleanDatabase()
  
  // Adicionar usuário master
  const adminPassword = await bcrypt.hash('admin123', 10)
  
  // Verifica se já existe um usuário admin
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  })
  
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'master'
      },
    })
    console.log('Usuário admin criado com sucesso!')
  } else {
    console.log('Usuário admin já existe, pulando criação')
  }

  // Adicionar os novos clientes
  await seedCustomers()
  
  console.log('Seed finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 