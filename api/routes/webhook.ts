import { Router } from 'express'
import { PrismaClient, EmailStatus } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.post('/webhook/email', async (req, res) => {
  try {
    const { event, emailId, metadata } = req.body

    // Mapeia eventos do provedor de email para nossos status
    const statusMap: Record<string, EmailStatus> = {
      'delivered': EmailStatus.DELIVERED,
      'opened': EmailStatus.OPENED,
      'clicked': EmailStatus.CLICKED,
      'bounced': EmailStatus.BOUNCED,
      'failed': EmailStatus.FAILED
    }

    if (emailId && statusMap[event]) {
      await prisma.emailLog.update({
        where: { id: emailId },
        data: {
          status: statusMap[event],
          webhookData: metadata
        }
      })
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Erro no webhook:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

export default router 