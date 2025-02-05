import { useState, useEffect } from 'react'
import { DollarSign, Package, CreditCard, QrCode, Receipt } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0C10]">
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard Gateway
            </h1>
            <DateRangePicker value={dateRange} onChange={setDateRange} />
          </div>
        </div>

        {/* Cards Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <MetricCard
            icon={<DollarSign className="h-6 w-6 text-[#4B7BF5]" />}
            title="Total em vendas"
            value={formatCurrency(61365.89)}
            subtitle="durante este período!"
            className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20"
            textColor="text-gray-900 dark:text-white"
            subtitleColor="text-gray-600 dark:text-gray-400"
          />
          <MetricCard
            icon={<CreditCard className="h-6 w-6 text-[#4B7BF5]" />}
            title="Ticket Médio"
            value={formatCurrency(47.83)}
            subtitle="Em 1.283 vendas!"
            className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20"
            textColor="text-gray-900 dark:text-white"
            subtitleColor="text-gray-600 dark:text-gray-400"
          />
          <MetricCard
            icon={<Package className="h-6 w-6 text-[#4B7BF5]" />}
            title="Pedidos Pagos"
            value="1.283"
            subtitle="durante este período!"
            className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20"
            textColor="text-gray-900 dark:text-white"
            subtitleColor="text-gray-600 dark:text-gray-400"
          />
        </div>

        {/* Gráfico de Vendas */}
        <div className="mb-8">
          <div className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Vendas Diárias
            </h2>
            <div className="h-[300px] text-gray-900 dark:text-gray-100">
              <LineChart data={dashboardData?.dailySales || []} />
            </div>
          </div>
        </div>

        {/* Faturamento e Progresso */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Métodos de Pagamento */}
          <div className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
              Métodos de Pagamento
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4B7BF5]/10 p-2 rounded">
                    <QrCode className="h-5 w-5 text-[#4B7BF5]" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Pix</span>
                </div>
                <span className="text-gray-900 dark:text-white">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4B7BF5]/10 p-2 rounded">
                    <CreditCard className="h-5 w-5 text-[#4B7BF5]" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Cartão de Crédito</span>
                </div>
                <span className="text-gray-900 dark:text-white">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-[#4B7BF5]/10 p-2 rounded">
                    <Receipt className="h-5 w-5 text-[#4B7BF5]" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">Boleto</span>
                </div>
                <span className="text-gray-900 dark:text-white">20%</span>
              </div>
            </div>
          </div>

          {/* Progresso no Funil */}
          <div className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Progresso no funil
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Leads enviados</span>
                <span className="text-gray-900 dark:text-white font-semibold">85.420</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Leads não taxados</span>
                <span className="text-gray-900 dark:text-white font-semibold">46.670</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Leads taxados</span>
                <span className="text-gray-900 dark:text-white font-semibold">38.750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Leads convertidos</span>
                <span className="text-gray-900 dark:text-white font-semibold">11.625</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custos e Faturamento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custos Operacionais */}
          <div className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Custos operacionais
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Taxas da plataforma</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(170538.75)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Custo total dos envios de e-mails</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(427.10)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Custo total dos envios de SMS</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(3100.00)}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(174065.85)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Faturamento */}
          <div className="bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Faturamento
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Taxa de Liberação</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(405712.50)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Frete 24H</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(162750.00)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Ticket médio</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  {formatCurrency(47.83)}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(568462.50)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lucro Total */}
        <div className="mt-8 bg-white dark:bg-[#12141A] shadow-sm dark:border-[#1F2937]/20 rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lucro Total</h2>
            <span className="text-xl font-bold text-green-600 dark:text-green-500">
              {formatCurrency(385241.65)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 