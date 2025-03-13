import { PrismaClient } from '@prisma/client'
import { customAlphabet } from 'nanoid'
import prisma from '../lib/prisma'

const prismaClient = new PrismaClient()

export class TrackingCodeService {
  private generateNumericPart(): string {
    const numbers = customAlphabet('0123456789', 9)
    return numbers()
  }

  private getShippingType(): string {
    // DG = Encomenda SEDEX
    // DL = Encomenda PAC
    return 'DG'
  }

  private getCountryCode(): string {
    return 'BR'
  }

  async generateUniqueCode(): Promise<string> {
    const maxAttempts = 10
    let attempts = 0

    while (attempts < maxAttempts) {
      const shippingType = this.getShippingType()
      const numericPart = this.generateNumericPart()
      const countryCode = this.getCountryCode()
      
      const code = `${shippingType}${numericPart}${countryCode}`

      try {
        // Verifica se o código já existe
        const existing = await prisma.order.findUnique({
          where: { trackingCode: code }
        })

        if (!existing) {
          return code
        }

        attempts++
      } catch (error) {
        console.error('Erro ao verificar código:', error)
        throw error
      }
    }

    throw new Error('Não foi possível gerar um código único após várias tentativas')
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
      const code = await this.generateUniqueCode()
      
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