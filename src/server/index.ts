import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

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
    // ... lógica de reenvio
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao reenviar email:', error);
    res.status(500).json({ error: 'Erro ao reenviar email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 