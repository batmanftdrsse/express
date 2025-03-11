import { PrismaClient } from '@prisma/client'
import { EmailSequenceService } from '../services/EmailSequenceService'
import { scheduleJob } from 'node-schedule'

const prisma = new PrismaClient()
const emailService = new EmailSequenceService()

export function startEmailSequenceCron() {
  // Executa a cada 5 minutos
  scheduleJob('*/5 * * * *', async () => {
    try {
      // Buscar sequências ativas que precisam do próximo email
      const sequences = await prisma.emailSequence.findMany({
        where: {
          status: 'active',
          lastEmailSentAt: {
            lt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24h atrás
          }
        }
      })

      for (const sequence of sequences) {
        await emailService.sendNextEmail(sequence.id)
      }
    } catch (error) {
      console.error('Erro no job de emails:', error)
    }
  })
} 