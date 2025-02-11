import { Router } from 'express'
import { EmailService } from '../../src/services/EmailService'
import { PrismaClient, EmailType } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()
const emailService = new EmailService()

// Rota para envio de email
router.post('/email/send', async (req, res) => {
  try {
    const { to, type, data } = req.body
    const emailLog = await emailService.sendEmail(to, type as EmailType, data)
    res.json(emailLog)
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    res.status(500).json({ error: 'Erro ao enviar email' })
  }
})

// Rota para tracking de abertura
router.get('/email/track/:id', async (req, res) => {
  try {
    await prisma.emailLog.update({
      where: { id: req.params.id },
      data: { status: 'OPENED' }
    })
    
    // Retorna um pixel transparente
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': '43'
    })
    res.end(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'))
  } catch (error) {
    console.error('Erro no tracking:', error)
    res.status(500).end()
  }
})

// Rota para métricas
router.get('/email/metrics', async (req, res) => {
  try {
    const [total, delivered, opened, clicked, failed] = await Promise.all([
      prisma.emailLog.count(),
      prisma.emailLog.count({ where: { status: 'DELIVERED' } }),
      prisma.emailLog.count({ where: { status: 'OPENED' } }),
      prisma.emailLog.count({ where: { status: 'CLICKED' } }),
      prisma.emailLog.count({ where: { status: 'FAILED' } })
    ])

    res.json({ total, delivered, opened, clicked, failed })
  } catch (error) {
    console.error('Erro ao buscar métricas:', error)
    res.status(500).json({ error: 'Erro ao buscar métricas' })
  }
})

export default router 