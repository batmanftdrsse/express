import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type TrackingUpdate = {
  status: string
  location: string
  description: string
  createdAt: string
}

type OrderDetails = {
  trackingCode: string
  status: string
  currentStep: number
  trackingUpdates: TrackingUpdate[]
}

export default function TrackingPage() {
  const { code } = useParams<{ code: string }>()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tracking/${code}`)
        if (!response.ok) throw new Error('Pedido não encontrado')
        const data = await response.json()
        setOrder(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar pedido')
      } finally {
        setLoading(false)
      }
    }

    if (code) {
      fetchOrder()
    }
  }, [code])

  if (loading) return <div>Carregando...</div>
  if (error) return <div>Erro: {error}</div>
  if (!order) return <div>Pedido não encontrado</div>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Rastreamento: {order.trackingCode}
      </h1>
      
      <div className="space-y-4">
        {order.trackingUpdates.map((update, index) => (
          <div 
            key={index}
            className="p-4 border rounded-lg dark:border-gray-700"
          >
            <div className="font-semibold text-gray-900 dark:text-white">
              {update.status}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {update.location}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(update.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 