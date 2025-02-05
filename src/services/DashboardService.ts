import { format } from 'date-fns'

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
  private baseUrl = 'http://localhost:3001/api'

  async getDashboardData(startDate: Date, endDate: Date): Promise<DashboardData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/dashboard?` + 
        new URLSearchParams({
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd')
        })
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar dados do dashboard')
      }

      return await response.json()
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      throw error
    }
  }
} 