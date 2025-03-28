import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Listar todos os usuários
    const users = await prisma.user.findMany();
    console.log('Usuários encontrados:', JSON.stringify(users, null, 2));
    
    // Criar usuário admin se não existir
    const adminEmail = 'admin@example.com';
    let admin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!admin) {
      console.log('Criando usuário admin...');
      admin = await prisma.user.create({
        data: {
          name: 'Administrador',
          email: adminEmail,
          password: '$2b$10$kl9GQO/LFOKl.4BqL/d0sOAPiOE3EOAdBWKXL7UgLfTVKH6i5r.eG', // hash de 'admin123'
          role: 'master'
        }
      });
      console.log('Usuário admin criado:', admin);
    } else {
      console.log('Usuário admin já existe:', admin);
    }
  } catch (error) {
    console.error('Erro ao consultar/criar usuários:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 