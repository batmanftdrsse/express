import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'

const prisma = new PrismaClient()

export class TrackingCodeService {
  private generateCode(): string {
    const numbers = customAlphabet('0123456789', 9)
    return `SL${numbers()}BR`
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