import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Package, Truck, CheckCircle, AlertCircle, MapPin, CreditCard, User, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TrackingInfo {
  trackingCode: string
  status: string
  customerName: string
  currentStep: number
  trackingUpdates: Array<{
    status: string
    description: string
    location: string
    createdAt: string
  }>
  createdAt: string
  transaction?: {
    amount: number
    paymentMethod: string
    status: string
    installments: number
    paidAt: string
    card?: {
      brand: string
      lastDigits: string
      holderName: string
      expirationMonth: number
      expirationYear: number
    }
  }
  customer: {
    name: string
    email: string
    phone: string
    document: {
      number: string
      type: string
    }
    address: {
      street: string
      streetNumber: string
      complement?: string
      zipCode: string
      neighborhood: string
      city: string
      state: string
    }
  }
  items: Array<{
    title: string
    quantity: number
    unitPrice: number
  }>
}

export default function TrackingPage() {
  const { code } = useParams<{ code: string }>()
  const [order, setOrder] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!code) return
      
      try {
        setLoading(true)
        const response = await fetch(`http://localhost:3001/api/tracking/${code}`)
        
        if (response.status === 404) {
          setError(`Pedido com código ${code} não encontrado`)
          setOrder(null)
          return
        }

        if (!response.ok) {
          throw new Error('Erro ao buscar informações do pedido')
        }

        const data = await response.json()
        setOrder(data)
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao buscar informações do pedido')
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [code])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3">Carregando...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
          <AlertCircle className="text-red-500 mr-3" />
          <span className="text-red-700 dark:text-red-300">{error}</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Verifique se o código foi digitado corretamente e tente novamente.
          </p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Pedido não encontrado
          </h2>
          <p className="text-yellow-700 dark:text-yellow-400">
            Não foi possível encontrar um pedido com o código {code}.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Rastreamento: {order.trackingCode}
      </h1>

      {/* Informações do Cliente */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Informações do Cliente</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p>Nome: {order.customer?.name}</p>
          <p>Email: {order.customer?.email}</p>
          {order.customer?.address && (
            <p>
              Endereço: {order.customer.address.street}, {order.customer.address.streetNumber}
              {order.customer.address.complement && `, ${order.customer.address.complement}`}
              <br />
              {order.customer.address.neighborhood} - {order.customer.address.city}/{order.customer.address.state}
              <br />
              CEP: {order.customer.address.zipCode}
            </p>
          )}
        </div>
      </div>

      {/* Atualizações de Rastreio */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Atualizações</h2>
        <div className="space-y-4">
          {order.trackingUpdates.map((update, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="font-semibold">{update.status}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {update.location}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(update.createdAt).toLocaleString()}
              </div>
              {update.description && (
                <div className="mt-2 text-sm">{update.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 