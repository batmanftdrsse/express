import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Package, Truck, CheckCircle, AlertCircle, MapPin, CreditCard, User, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TrackingInfo {
  id: number
  trackingCode: string
  externalId: string
  customerName: string
  customerEmail: string
  status: string
  currentStep: number
  createdAt: string
  updatedAt: string
  customerId: number
  transactionId: number | null
  customer: {
    id: number
    name: string
    email: string
    phone: string
    createdAt: string
    updatedAt: string
    document: {
      id: number
      number: string
      type: string
      customerId: number
    }
    address: {
      id: number
      street: string
      streetNumber: string
      complement: string | null
      zipCode: string
      neighborhood: string
      city: string
      state: string
      country: string
      customerId: number
    }
  }
  trackingUpdates: Array<{
    id: number
    orderId: number
    status: string
    location: string
    description: string
    createdAt: string
  }>
}

export default function TrackingPage() {
  const params = useParams()
  const { code } = params
  
  console.log('Parâmetros recebidos:', params)
  console.log('Código extraído:', code)

  const [order, setOrder] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log('TrackingPage renderizado com código:', code)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!code) {
        console.log('Código não fornecido')
        return
      }
      
      try {
        setLoading(true)
        console.log('Iniciando busca do pedido:', code)

        // Força a URL da API
        const apiUrl = 'http://localhost:3001'
        const url = `${apiUrl}/api/tracking/${code}`
        
        console.log('Fazendo requisição para:', url)

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        })

        console.log('Status da resposta:', response.status)
        
        // Lê o corpo da resposta como texto primeiro para debug
        const textResponse = await response.text()
        console.log('Resposta bruta:', textResponse)

        try {
          // Converte para JSON
          const data = JSON.parse(textResponse)
          console.log('Dados parseados:', data)

          if (response.status === 404) {
            setError(`Pedido com código ${code} não encontrado`)
            setOrder(null)
            return
          }

          if (!response.ok) {
            throw new Error('Erro ao buscar informações do pedido')
          }

          setOrder(data)
          setError(null)
        } catch (parseError) {
          console.error('Erro ao fazer parse do JSON:', parseError)
          throw new Error('Erro ao processar resposta do servidor')
        }
      } catch (error) {
        console.error('Erro completo:', error)
        setError(error instanceof Error ? error.message : 'Erro ao buscar informações do pedido')
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    console.log('useEffect executado com código:', code)
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
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Rastreamento: {order.trackingCode}
      </h1>

      {/* Status do Pedido */}
      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Status: <span className="text-blue-600 dark:text-blue-400">{order.status}</span>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pedido criado em: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-blue-600 dark:text-blue-400">
              <Package size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Cliente */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          <User className="inline-block mr-2" size={20} />
          Informações do Cliente
        </h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Nome:</span> {order.customer?.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span> {order.customer?.email}
          </p>
          {order.customer?.address && (
            <div className="mt-2 text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-1">Endereço:</p>
              <div className="pl-4">
                <p>{order.customer.address.street}, {order.customer.address.streetNumber}
                {order.customer.address.complement && `, ${order.customer.address.complement}`}</p>
                <p>{order.customer.address.neighborhood} - {order.customer.address.city}/{order.customer.address.state}</p>
                <p>CEP: {order.customer.address.zipCode}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Atualizações de Rastreio */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          <Truck className="inline-block mr-2" size={20} />
          Atualizações
        </h2>
        <div className="space-y-4">
          {order.trackingUpdates.map((update, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex items-start">
                <div className="mr-4 text-blue-600 dark:text-blue-400">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {update.status}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {update.location}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(update.createdAt).toLocaleString()}
                  </div>
                  {update.description && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {update.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 