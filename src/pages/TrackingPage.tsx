import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dashboardService } from '../services/dashboardService'

interface TrackingData {
  status: string
  updatedAt: string
  history: Array<{
    status: string
    date: string
    location?: string
  }>
  deliveryAddress?: {
    recipient: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  estimatedDelivery?: string
  currentStatus?: string
}

export default function TrackingPage() {
  const { trackingCode } = useParams()
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTrackingData() {
      try {
        setLoading(true)
        const data = await dashboardService.getTrackingStatus(trackingCode!)
        setTrackingData({
          ...data,
          deliveryAddress: {
            recipient: 'Maria Silva',
            street: 'Rua das Flores',
            number: '123',
            neighborhood: 'Jardim América',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567'
          },
          estimatedDelivery: '18/03/2024',
          currentStatus: data.status
        })
      } catch (err) {
        setError('Falha ao carregar dados do rastreamento')
      } finally {
        setLoading(false)
      }
    }

    if (trackingCode) {
      loadTrackingData()
    }
  }, [trackingCode])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>
  if (!trackingData || !trackingCode) return null

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Número de Rastreamento</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-mono">{trackingCode}</span>
            <button className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Previsão de Entrega</p>
              <p className="text-lg">{trackingData.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-gray-400">Tempo de Espera Estimado</p>
              <p className="text-lg">Em Processo Aduaneiro</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-600/20 rounded-full">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Status: {trackingData.status}</h3>
              <p className="text-gray-400">{trackingData.deliveryAddress?.city}, {trackingData.deliveryAddress?.state}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Detalhes do Pedido</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Endereço de Entrega</h3>
              <p className="text-gray-400">{trackingData.deliveryAddress?.recipient}</p>
              <p className="text-gray-400">
                {trackingData.deliveryAddress?.street}, {trackingData.deliveryAddress?.number}
              </p>
              <p className="text-gray-400">
                {trackingData.deliveryAddress?.neighborhood}, {trackingData.deliveryAddress?.city}
              </p>
              <p className="text-gray-400">
                {trackingData.deliveryAddress?.state} - CEP: {trackingData.deliveryAddress?.zipCode}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Histórico de Atualizações</h2>
          <div className="space-y-6">
            {trackingData.history.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  {index < trackingData.history.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-700"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    {new Date(event.date).toLocaleString('pt-BR')}
                  </p>
                  <p className="font-medium">{event.status}</p>
                  {event.location && (
                    <p className="text-gray-400">{event.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 