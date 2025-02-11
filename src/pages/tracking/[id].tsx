import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TrackingUpdate {
  status: string
  description: string
  location: string
  createdAt: string
}

interface TrackingInfo {
  trackingCode: string
  status: string
  customerName: string
  currentStep: number
  updates: TrackingUpdate[]
  createdAt: string
}

export default function TrackingPage() {
  const { id } = useParams()
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTrackingInfo() {
      try {
        const response = await fetch(`/api/tracking/${id}`)
        if (!response.ok) {
          throw new Error('Pedido não encontrado')
        }
        const data = await response.json()
        setTrackingInfo(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTrackingInfo()
    }
  }, [id])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  if (!trackingInfo) return <div>Pedido não encontrado</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Rastreamento: {trackingInfo.trackingCode}
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Cliente: {trackingInfo.customerName}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Data do pedido: {format(new Date(trackingInfo.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>

          <div className="space-y-6">
            {trackingInfo.updates.map((update, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {update.status === 'PENDING' && <Package className="h-6 w-6 text-blue-500" />}
                  {update.status === 'IN_TRANSIT' && <Truck className="h-6 w-6 text-yellow-500" />}
                  {update.status === 'DELIVERED' && <CheckCircle className="h-6 w-6 text-green-500" />}
                  {update.status === 'FAILED' && <AlertCircle className="h-6 w-6 text-red-500" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {update.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {update.location}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {format(new Date(update.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 