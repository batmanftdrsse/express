import { useEffect, useState } from 'react'
import { Card } from '../../components/ui/Card'
import { formatCurrency } from '../../utils/format'
import { LineChart } from '../../components/Charts/LineChart'
import { useDateRange } from '../../contexts/DateContext'

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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { dateRange } = useDateRange()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando busca de dados...')
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
        
        const response = await fetch(`${baseUrl}/api/dashboard`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`)
        }

        const dashboardData = await response.json()
        console.log('Dados recebidos:', dashboardData)
        setData(dashboardData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setError(error instanceof Error ? error.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  if (!data) return <div>Nenhum dado encontrado</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Métricas de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <h3>Total de Vendas</h3>
          <p className="text-2xl font-bold">{formatCurrency(data.sales.total)}</p>
        </Card>
        <Card>
          <h3>Ticket Médio</h3>
          <p className="text-2xl font-bold">{formatCurrency(data.sales.averageTicket)}</p>
        </Card>
        <Card>
          <h3>Total de Pedidos</h3>
          <p className="text-2xl font-bold">{data.sales.totalOrders}</p>
        </Card>
      </div>

      {/* Gráfico de Vendas */}
      <Card className="mb-6">
        <h3 className="mb-4">Vendas Diárias</h3>
        <LineChart data={data.dailySales} />
      </Card>

      {/* Métricas do Funil */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <h3>Total de Leads</h3>
          <p className="text-2xl font-bold">{data.funnel.totalLeads}</p>
        </Card>
        <Card>
          <h3>Leads não Taxados</h3>
          <p className="text-2xl font-bold">{data.funnel.nonTaxedLeads}</p>
        </Card>
        <Card>
          <h3>Leads Taxados</h3>
          <p className="text-2xl font-bold">{data.funnel.taxedLeads}</p>
        </Card>
        <Card>
          <h3>Leads Convertidos</h3>
          <p className="text-2xl font-bold">{data.funnel.convertedLeads}</p>
        </Card>
      </div>

      {/* Custos e Receitas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="mb-4">Custos</h3>
          <div className="space-y-2">
            <p>Taxa da Plataforma: {formatCurrency(data.costs.platformFees)}</p>
            <p>Custo de Email: {formatCurrency(data.costs.emailCosts)}</p>
            <p>Custo de SMS: {formatCurrency(data.costs.smsCosts)}</p>
          </div>
        </Card>
        <Card>
          <h3 className="mb-4">Receitas</h3>
          <div className="space-y-2">
            <p>Taxa de Liberação: {formatCurrency(data.revenue.releaseFee)}</p>
            <p>Taxa de Envio: {formatCurrency(data.revenue.shippingFee)}</p>
            <p>Ticket Médio: {formatCurrency(data.revenue.averageTicket)}</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 