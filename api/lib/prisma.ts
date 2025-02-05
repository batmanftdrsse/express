import { PrismaClient } from '@prisma/client'

// Cria uma instância global do PrismaClient
const prisma = new PrismaClient()

export default prisma 