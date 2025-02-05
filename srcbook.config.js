import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  port: 2150,
  host: '127.0.0.1',
  middleware: async (req, res, next) => {
    // Log para debug
    console.log('Request:', {
      method: req.method,
      url: req.url,
      body: req.body
    });

    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
  },
  routes: {
    // Rota simplificada
    '/api/auth/login': {
      post: async (req, res) => {
        try {
          console.log('Login request:', req.body);
          const { email, password } = req.body;

          if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
          }

          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
          }

          // Temporariamente usando senha direta para teste
          const validPassword = password === 'admin123';
          
          if (!validPassword) {
            return res.status(401).json({ error: 'Senha incorreta' });
          }

          const token = Buffer.from(`${user.id}:${user.email}`).toString('base64');

          return res.status(200).json({ 
            token,
            user: {
              id: user.id,
              email: user.email,
              role: user.role
            }
          });
        } catch (error) {
          console.error('Login error:', error);
          return res.status(500).json({ error: 'Erro interno do servidor' });
        }
      }
    }
  }
}; 