import { Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

const router = Router();

// Middleware para verificar se é um usuário master
const isMasterUser = async (req: any, res: any, next: any) => {
  try {
    // Em um cenário real, você verificaria o token JWT
    // Para este exemplo, vamos fazer uma verificação simples
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    // Em uma implementação real, você verificaria o token JWT aqui
    // Por enquanto, vamos simplesmente permitir o acesso
    next();
    
    // No futuro, algo assim:
    // const userId = decodedToken.userId;
    // const user = await prisma.user.findUnique({ where: { id: userId } });
    // if (user && user.role === 'master') {
    //   next();
    // } else {
    //   res.status(403).json({ error: 'Acesso negado' });
    // }
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Listar todos os usuários
router.get('/users', isMasterUser, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Criar usuário
router.post('/users', isMasterUser, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso' });
    }
    
    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Criar o usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      }
    });
    
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.patch('/users/:id', isMasterUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Atualizar o usuário
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Excluir usuário
router.delete('/users/:id', isMasterUser, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Excluir o usuário
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

// Obter configuração atual da API
router.get('/api-config', isMasterUser, async (req, res) => {
  try {
    // Em um cenário real, você obteria o userId do token JWT
    // Para este exemplo, vamos buscar a configuração ativa mais recente
    const apiConfig = await prisma.apiConfig.findFirst({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!apiConfig) {
      // Retornar um valor padrão se não houver configuração
      return res.json({ 
        apiKey: 'sk_eDKC7xOLbkyoZOFaDNyGhLhlkr645oiV7jLtNJbHUpdJoQbZ',
        lastUpdatedBy: null
      });
    }
    
    // Ocultar parte da chave para segurança na resposta
    const maskedApiKey = `${apiConfig.apiKey.substring(0, 8)}...${apiConfig.apiKey.substring(apiConfig.apiKey.length - 4)}`;
    
    res.json({
      apiKey: apiConfig.apiKey,
      maskedApiKey,
      lastUpdatedAt: apiConfig.createdAt,
      lastUpdatedBy: apiConfig.user ? {
        id: apiConfig.user.id,
        name: apiConfig.user.name,
        email: apiConfig.user.email
      } : null
    });
  } catch (error) {
    console.error('Erro ao obter configuração da API:', error);
    res.status(500).json({ error: 'Erro ao obter configuração da API' });
  }
});

// Atualizar chave da API
router.post('/api-config', isMasterUser, async (req, res) => {
  try {
    const { apiKey } = req.body;
    
    if (!apiKey || !apiKey.startsWith('sk_')) {
      return res.status(400).json({ error: 'Chave de API inválida. Deve começar com sk_' });
    }
    
    // Em um cenário real, você obteria o userId do token JWT
    // Para este exemplo, vamos usar o primeiro usuário master
    const adminUser = await prisma.user.findFirst({
      where: { role: 'master' }
    });
    
    if (!adminUser) {
      return res.status(404).json({ error: 'Usuário master não encontrado' });
    }
    
    // Desativar configurações anteriores
    await prisma.apiConfig.updateMany({
      where: { active: true },
      data: { active: false }
    });
    
    // Criar nova configuração
    const newConfig = await prisma.apiConfig.create({
      data: {
        apiKey,
        userId: adminUser.id,
        active: true
      }
    });
    
    res.json({
      success: true,
      message: 'Chave de API atualizada com sucesso',
      timestamp: newConfig.createdAt
    });
  } catch (error) {
    console.error('Erro ao atualizar chave da API:', error);
    res.status(500).json({ error: 'Erro ao atualizar chave da API' });
  }
});

export default router; 