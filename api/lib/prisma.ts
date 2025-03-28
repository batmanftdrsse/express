import { PrismaClient } from '@prisma/client'

// Cria uma instância global do PrismaClient
console.log('Inicializando PrismaClient...')
const prisma = new PrismaClient()

// Verificar se o prisma foi inicializado corretamente
if (!prisma) {
  console.error('ERRO: PrismaClient não foi inicializado corretamente!')
} else {
  console.log('PrismaClient inicializado com sucesso!')
}

// Teste de conexão
prisma.$connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch((e) => console.error('Erro ao conectar ao banco de dados:', e))

export default prisma 