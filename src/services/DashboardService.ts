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

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const mockData: DashboardStats = {
      totalOrders: 13,
      ordersInTransit: 3,
      deliveredOrders: 2,
      monthlyRevenue: 15990.50,
      dailySales: [],
      ordersByStatus: [
        { status: 'Aguardando', count: 2 },
        { status: 'Em Trânsito', count: 3 },
        { status: 'Entregue', count: 2 },
        { status: 'Pago', count: 4 },
        { status: 'Recusado', count: 1 },
        { status: 'Estornado', count: 1 }
      ],
      recentOrders: [
        {
          id: '1',
          trackingCode: 'RE963741852BR',
          status: 'Aguardando',
          createdAt: new Date().toISOString()
        }
      ]
    }

    return mockData
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