import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'
import prisma from '../lib/prisma'

const prismaClient = new PrismaClient()

export class TrackingCodeService {
  private generateCode(): string {
    const numbers = customAlphabet('0123456789', 9)
    return `SL${numbers()}BR`
  }

  async getTrackingInfo(code: string) {
    const order = await prisma.order.findUnique({
      where: { trackingCode: code },
      include: {
        trackingUpdates: true,
        customer: {
          include: {
            document: true,
            address: true
          }
        },
        transaction: {
          include: {
            card: true,
            items: true
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
      currentStep: order.currentStep,
      createdAt: order.createdAt,
      updates: order.trackingUpdates.map(update => ({
        status: update.status,
        description: update.description,
        location: update.location,
        createdAt: update.createdAt
      })),
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        document: order.customer.document,
        address: order.customer.address
      },
      transaction: order.transaction ? {
        amount: order.transaction.amount,
        paymentMethod: order.transaction.paymentMethod,
        status: order.transaction.status,
        installments: order.transaction.installments,
        paidAt: order.transaction.paidAt,
        card: order.transaction.card,
        items: order.transaction.items
      } : undefined
    }
  }

  async createTrackingCode(transactionId: string): Promise<string> {
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      const code = this.generateCode()
      
      try {
        await prismaClient.order.create({
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