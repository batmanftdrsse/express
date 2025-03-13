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
  async getDashboardData(startDate: Date, endDate: Date): Promise<DashboardData> {
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

  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/dashboard/stats')
    return response.data
  }
}

export const dashboardService = new DashboardService() 