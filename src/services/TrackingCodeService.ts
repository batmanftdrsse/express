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
    // Código de serviço RE para rastreamento internacional
    return 'RE'
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
      }
    }
  }

  async createTrackingCode(transactionId: string): Promise<string> {
    // Gerar um código de rastreamento fixo para exemplos se solicitado
    if (transactionId.startsWith('EXEMPLO')) {
      // Extrair o número do exemplo (1-5)
      const exampleNumber = transactionId.replace('EXEMPLO', '');
      return `RE${exampleNumber.padStart(9, '0')}BR`;
    }
    
    // Caso contrário, gerar um código aleatório
    return this.generateUniqueCode();
  }
} 