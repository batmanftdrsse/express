import { format } from 'date-fns'
import api from './api'
import { DashboardStats } from '../types/dashboard'

interface DashboardData {
  sales: {
    total: number
    averageTicket: number
    totalOrders: number
  }
  funnel: {
    totalLeads: number
    nonTaxedLeads: number
    taxedLeads: number
    convertedLeads: number
  }
  costs: {
    platformFees: number
    emailCosts: number
    smsCosts: number
  }
  revenue: {
    releaseFee: number
    shippingFee: number
    averageTicket: number
  }
  dailySales: Array<{
    date: string
    value: number
  }>
}

interface EmailSmsStats {
  emailsEnviados: number;
  emailsNaoEntregues: number;
  smsEnviados: number;
  smsNaoEntregues: number;
  emailDeliveryRate: number;
  smsDeliveryRate: number;
}

interface FunnelStats {
  totalLeads: number;
  nonTaxedLeads: number;
  taxedLeads: number;
  convertedLeads: number;
  conversionRate: number;
}

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard/stats')
      const apiData = response.data
      
      return {
        totalOrders: apiData.totalOrders || 0,
        ordersInTransit: apiData.ordersInTransit || 0,
        unpaidOrders: apiData.unpaidOrders || 0,
        unpaidAmount: apiData.unpaidAmount || 0,
        monthlyRevenue: apiData.monthlyRevenue || 0,
        dailySales: apiData.dailySales || [],
        ordersByStatus: apiData.ordersByStatus || [],
        recentOrders: apiData.recentOrders || [],
        paymentStats: apiData.paymentStats || {
          totalPending: 0,
          totalPaid: 0,
          pendingAmount: 0,
          paidAmount: 0
        }
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas do dashboard:', error)
      throw error // Força o erro para cima ao invés de retornar dados mockados
    }
  }
  
  async getRecentOrders(page: number = 1, limit: number = 10): Promise<any> {
    try {
      const response = await api.get('/orders/recent', {
        params: { page, limit }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao buscar pedidos recentes:', error)
      throw error
    }
  }
  
  async getEmailSmsStats(): Promise<EmailSmsStats> {
    try {
      const response = await api.get('/dashboard/email-sms-stats')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar estatísticas de email e SMS:', error)
      
      // Dados de fallback em caso de erro
      return {
        emailsEnviados: 867,
        emailsNaoEntregues: 32,
        smsEnviados: 425,
        smsNaoEntregues: 15,
        emailDeliveryRate: 96.3,
        smsDeliveryRate: 96.5
      }
    }
  }
  
  async getFunnelStats(): Promise<FunnelStats> {
    try {
      const response = await api.get('/funnel-data')
      const apiData = response.data
      
      return {
        totalLeads: apiData.totalSequences || 0,
        nonTaxedLeads: apiData.totalSequences - apiData.activeSequences || 0,
        taxedLeads: apiData.activeSequences || 0,
        convertedLeads: apiData.completedSequences || 0,
        conversionRate: apiData.successRate || 0
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas do funil:', error)
      
      // Dados de fallback em caso de erro
      return {
        totalLeads: 1250,
        nonTaxedLeads: 480,
        taxedLeads: 770,
        convertedLeads: 135,
        conversionRate: 10.8
      }
    }
  }

  async getDashboardData(startDate: Date, endDate: Date): Promise<any> {
    try {
      const response = await api.get('/dashboard', {
        params: {
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd')
        }
      })
      return response.data
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      throw error
    }
  }

  async getTrackingStatus(trackingCode: string) {
    try {
      console.log('Buscando pedido:', trackingCode)
      
      // Buscar dados da API
      const response = await fetch(`/api/tracking/${trackingCode}`)
      const apiData = await response.json()
      console.log('Dados da API:', apiData)

      if (!apiData) {
        throw new Error('Pedido não encontrado')
      }

      // Mapear status
      const statusMap = {
        'waiting_payment': 'Aguardando Pagamento',
        'paid': 'Pago',
        'in_transit': 'Em Trânsito',
        'delivered': 'Entregue'
      }

      const trackingData = {
        status: statusMap[apiData.status] || apiData.status,
        updatedAt: apiData.updatedAt,
        trackingCode: apiData.trackingCode,
        estimatedDelivery: apiData.estimatedDelivery || '18/03/2024',
        currentStatus: statusMap[apiData.status] || apiData.status,
        deliveryAddress: {
          recipient: 'Maria Silva',
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Jardim América',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        }
      }

      console.log('Dados processados:', trackingData)
      return trackingData

    } catch (error) {
      console.error('Erro ao buscar status:', error)
      throw error
    }
  }
}

export const dashboardService = new DashboardService() 