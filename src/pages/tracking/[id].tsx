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
  const { id } = useParams<{ id: string }>()
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!id) return // Proteção extra para ID undefined
      
      try {
        setLoading(true) // Garante que loading é true ao iniciar busca
        const response = await fetch(`http://localhost:3001/api/tracking/${id}`)
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Pedido não encontrado' : 'Erro ao buscar informações do pedido')
        }
        const data = await response.json()
        if (!data || !data.trackingUpdates) { // Validação extra dos dados
          throw new Error('Dados do pedido inválidos')
        }
        setTrackingInfo(data)
        setError(null)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Erro ao buscar informações do pedido')
        setTrackingInfo(null) // Limpa dados em caso de erro
        console.error('Erro:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [id])

  // Mostra loading enquanto carrega
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Carregando informações...
          </h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Mostra erro se houver
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Erro</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  // Proteção extra contra dados inválidos
  if (!trackingInfo?.trackingUpdates) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Dados Indisponíveis</h2>
          <p className="text-gray-600 dark:text-gray-300">Não foi possível carregar as informações do pedido</p>
        </div>
      </div>
    )
  }

  // Renderização principal
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Informações principais */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Rastreamento: {trackingInfo.trackingCode}
              </h1>
              
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Cliente: {trackingInfo?.customer.name}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Data do pedido: {format(new Date(trackingInfo?.createdAt || ''), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>

              {/* Timeline de atualizações com verificação extra */}
              <div className="space-y-6">
                {Array.isArray(trackingInfo.trackingUpdates) && trackingInfo.trackingUpdates.map((update, index) => (
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
                      <p className="text-sm text-gray-500">
                        {format(new Date(update.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar com informações adicionais */}
          <div className="space-y-6">
            {/* Informações do pagamento */}
            {trackingInfo?.transaction && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Pagamento
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Valor: R$ {(trackingInfo.transaction.amount / 100).toFixed(2)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Método: {trackingInfo.transaction.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'Outro'}
                  </p>
                  {trackingInfo.transaction.card && (
                    <p className="text-gray-600 dark:text-gray-300">
                      Cartão: {trackingInfo.transaction.card.brand.toUpperCase()} **** {trackingInfo.transaction.card.lastDigits}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Endereço de entrega */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço de Entrega
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  {trackingInfo?.customer.address.street}, {trackingInfo?.customer.address.streetNumber}
                </p>
                {trackingInfo?.customer.address.complement && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {trackingInfo.customer.address.complement}
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-300">
                  {trackingInfo?.customer.address.neighborhood}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {trackingInfo?.customer.address.city} - {trackingInfo?.customer.address.state}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  CEP: {trackingInfo?.customer.address.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 