import { Router } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Middleware para verificar se é usuário master
const isMasterMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const [, token] = authHeader.split(' ');
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      
      const user = await prisma.user.findUnique({
        where: { id: parseInt(decoded.userId) }
      });
      
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
      
      if (user.role !== 'master') {
        return res.status(403).json({ error: 'Acesso restrito a usuários master' });
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      return res.status(401).json({ error: 'Token inválido' });
    }
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Aplicar middleware a todas as rotas
router.use('/admin', isMasterMiddleware);

// Listar todos os usuários
router.get('/admin/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    
    res.json(users);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar um novo usuário
router.post('/admin/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validações
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso' });
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === 'master' ? 'master' : 'user'
      }
    });
    
    // Retornar sem a senha
    const userWithoutPassword = {...newUser};
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Atualizar role do usuário
router.patch('/admin/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { role } = req.body;
    
    if (!['user', 'master'].includes(role)) {
      return res.status(400).json({ error: 'Role inválida' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Excluir usuário
router.delete('/admin/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Evitar que o usuário exclua a si mesmo
    if (user.id === req.user.id) {
      return res.status(400).json({ error: 'Não é possível excluir seu próprio usuário' });
    }
    
    await prisma.user.delete({
      where: { id: userId }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router; 