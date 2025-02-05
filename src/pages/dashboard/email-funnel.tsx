import { useState, useEffect } from 'react'
import { DollarSign, Package, TrendingUp } from 'lucide-react'
import { DateRangePicker } from '../../components/DateRangePicker'
import { MetricCard } from '../../components/MetricCard'
import { LineChart } from '../../components/LineChart'
import { DashboardService } from '../../services/DashboardService'
import { formatCurrency } from '../../utils/format'

const dashboardService = new DashboardService()

export default function EmailFunnelPage() {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date()
  })
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await dashboardService.getDashboardData(dateRange.start, dateRange.end)
        setDashboardData(data)
        setError(null)
      } catch (error) {
        setError('Erro ao carregar dados do dashboard')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard de Vendas
            </h1>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Acompanhe suas métricas em tempo real
          </p>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            icon={<DollarSign className="h-6 w-6 text-blue-600" />}
            title="Total em vendas"
            value={formatCurrency(dashboardData?.sales.total || 0)}
            trend={{
              value: 12.5,
              positive: true,
              label: 'vs. mês anterior'
            }}
          />
          <MetricCard
            icon={<TrendingUp className="h-6 w-6 text-green-600" />}
            title="Ticket Médio"
            value={formatCurrency(dashboardData?.sales.averageTicket || 0)}
            trend={{
              value: 8.2,
              positive: true,
              label: 'vs. mês anterior'
            }}
          />
          <MetricCard
            icon={<Package className="h-6 w-6 text-purple-600" />}
            title="Pedidos Pagos"
            value={dashboardData?.sales.totalOrders.toString() || '0'}
            trend={{
              value: 5.1,
              positive: false,
              label: 'vs. mês anterior'
            }}
          />
        </div>

        {/* Gráfico e Funil */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Gráfico de Vendas */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Vendas Diárias
            </h2>
            <div className="h-80">
              <LineChart data={dashboardData?.dailySales || []} />
            </div>
          </div>

          {/* Funil de Vendas */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Funil de Vendas
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Leads Totais</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dashboardData?.funnel.totalLeads}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Leads Taxados</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dashboardData?.funnel.taxedLeads}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Leads Convertidos</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dashboardData?.funnel.convertedLeads}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Taxa de Conversão</span>
                  <span className="font-semibold text-green-500 dark:text-green-400">
                    {((dashboardData?.funnel.convertedLeads || 0) / (dashboardData?.funnel.totalLeads || 1) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custos e Receitas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Custos Operacionais
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Taxas da Plataforma</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData?.costs.platformFees || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Custo de E-mails</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData?.costs.emailCosts || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Custo de SMS</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData?.costs.smsCosts || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Receitas */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Receitas
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Taxa de Liberação</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData?.revenue.releaseFee || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Taxa de Frete</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData?.revenue.shippingFee || 0)}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Lucro Total</span>
                  <span className="font-semibold text-green-500 dark:text-green-400">
                    {formatCurrency(
                      (dashboardData?.revenue.releaseFee || 0) + 
                      (dashboardData?.revenue.shippingFee || 0) - 
                      (dashboardData?.costs.platformFees || 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 