import { useEffect, useState } from 'react'
import { MetricCard } from '../../components/MetricCard'
import toast from 'react-hot-toast'

interface FunnelData {
  totalSequences: number
  activeSequences: number
  completedSequences: number
  stepCounts: any[]
  sequences: any[]
  totalEmailsSent: number
  successRate: number
}

export default function EmailFunnelPage() {
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchFunnelData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/funnel-data')
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do funil')
      }

      const data = await response.json()
      setFunnelData(data)
      setError(null)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setError('Erro ao carregar dados do funil')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFunnelData()
    const interval = setInterval(fetchFunnelData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="p-6">Carregando...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Dashboard de Email Marketing
      </h1>
      
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total de Sequências" value={funnelData?.totalSequences || 0} />
        <MetricCard title="Sequências Ativas" value={funnelData?.activeSequences || 0} />
        <MetricCard title="Sequências Completadas" value={funnelData?.completedSequences || 0} />
        <MetricCard title="Taxa de Sucesso" value={`${funnelData?.successRate || 0}%`} />
      </div>

      {/* Lista de Sequências */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Sequências Ativas
        </h2>
        <div className="space-y-4">
          {funnelData?.sequences.map((sequence) => (
            <div 
              key={sequence.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Cliente #{sequence.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sequence.customer_email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Etapa {sequence.current_step}/6
                  </p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sequence.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {sequence.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 