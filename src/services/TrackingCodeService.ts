import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()

export class TrackingCodeService {
  private generateCode(): string {
    const numbers = customAlphabet('0123456789', 9)
    return `SL${numbers()}BR`
  }

  async getTrackingInfo(code: string) {
    try {
      const order = await prisma.order.findUnique({
        where: { trackingCode: code },
        include: {
          trackingUpdates: {
            orderBy: { createdAt: 'desc' }
          },
          emailSequence: {
            include: {
              emailLogs: true
            }
          }
        }
      })

      if (!order) {
        throw new Error('Pedido não encontrado')
      }

      return {
        trackingCode: order.trackingCode,
        status: order.status,
        customerName: order.customerName,
        currentStep: order.currentStep,
        updates: order.trackingUpdates,
        sequence: order.emailSequence,
        createdAt: order.createdAt
      }
    } catch (error) {
      console.error('Erro ao buscar informações de rastreio:', error)
      throw error
    }
  }

  async createTrackingCode(transactionId: string): Promise<string> {
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      const code = this.generateCode()
      
      try {
        await prisma.order.create({
          data: {
            trackingCode: code,
            externalId: transactionId,
            status: 'PENDING'
          }
        })
        
        return code
      } catch (error) {
        if (error.code === 'P2002') { // Unique constraint error
          attempts++
          continue
        }
        throw error
      }
    }

    throw new Error('Não foi possível gerar um código único após várias tentativas')
  }
} 