import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Log de conexão com o banco
prisma.$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

const PORT = 3001;

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rota de login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

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
    console.log('Login successful:', { email });

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
});

// Rota para dados do funil
app.get('/api/funnel-data', async (req, res) => {
  try {
    const funnelData = await prisma.$transaction(async (tx) => {
      const totalSequences = await tx.emailSequences.count();
      const activeSequences = await tx.emailSequences.count({
        where: { status: 'active' }
      });
      const completedSequences = await tx.emailSequences.count({
        where: { status: 'completed' }
      });

      const stepCounts = await tx.emailSequences.groupBy({
        by: ['current_step'],
        _count: true,
        where: { status: 'active' }
      });

      const sequences = await tx.emailSequences.findMany({
        where: { status: 'active' },
        take: 10,
        orderBy: { started_at: 'desc' },
        include: {
          email_logs: true
        }
      });

      const totalEmailsSent = await tx.emailLogs.count({
        where: { status: 'sent' }
      });

      const successRate = totalSequences > 0 
        ? Math.round((completedSequences / totalSequences) * 100) 
        : 0;

      return {
        totalSequences,
        activeSequences,
        completedSequences,
        stepCounts,
        sequences,
        totalEmailsSent,
        successRate
      };
    });

    res.json(funnelData);
  } catch (error) {
    console.error('Erro ao buscar dados do funil:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do funil' });
  }
});

// Rota para reenvio de email
app.post('/api/retry-email', async (req, res) => {
  try {
    const { sequenceId, emailType } = req.body;
    
    // Busca a sequência
    const sequence = await prisma.emailSequences.findUnique({
      where: { id: sequenceId },
      include: { email_logs: true }
    });

    if (!sequence) {
      return res.status(404).json({ error: 'Sequência não encontrada' });
    }

    // Atualiza o status do email para pending
    await prisma.emailLogs.updateMany({
      where: {
        sequence_id: sequenceId,
        email_type: emailType
      },
      data: {
        status: 'pending'
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao reenviar email:', error);
    res.status(500).json({ error: 'Erro ao reenviar email' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    prisma.$disconnect();
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  server.close(() => {
    console.log('HTTP server closed');
    prisma.$disconnect();
    process.exit(1);
  });
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
}); 