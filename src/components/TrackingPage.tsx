import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Package, Truck, Clock, MapPin, Check, X, AlertTriangle } from 'lucide-react'
import { useDarkMode } from '../contexts/DarkModeContext'
import toast from 'react-hot-toast'
import React from 'react'

interface TrackingUpdate {
  status: string
  location: string
  description?: string
  createdAt: string
}

interface Address {
  street: string;
  streetNumber: string;
  complement?: string;
  zipCode: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: Address;
}

interface Item {
  title: string;
  quantity: number;
  unitPrice: number;
}

interface TrackingInfo {
  trackingCode: string;
  status: string;
  currentStep: number;
  estimatedDelivery: string;
  urgentDelivery?: boolean;
  origin: string;
  destination: string;
  customer: Customer;
  items: Item[];
  trackingUpdates: TrackingUpdate[];
}

const statusTranslations: Record<string, { text: string; color: string; icon: any }> = {
  'pending': { 
    text: 'Pendente', 
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    icon: AlertTriangle
  },
  'in_transit': { 
    text: 'Em Trânsito', 
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    icon: Package
  }
}

export default function TrackingPage() {
  const { isDarkMode } = useDarkMode()
  const { code } = useParams<{ code: string }>()
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!code) return

      try {
        setLoading(true)
        // Por enquanto, vamos usar os dados mockados diretamente
        // Depois você pode substituir por uma chamada real à API
        import('../mocks/trackingData').then(({ mockTrackingData }) => {
          const isLastEmail = mockTrackingData.emailSequence?.currentStep === mockTrackingData.emailSequence?.totalSteps
          const isPaymentPending = mockTrackingData.emailSequence?.lastEmailType === 'PAYMENT_REQUIRED'
          
          const formattedData = {
            trackingCode: mockTrackingData.delivery.trackingCode,
            status: (isLastEmail && isPaymentPending) ? 'pending' : 'in_transit',
            currentStep: 3,
            estimatedDelivery: mockTrackingData.delivery.estimatedDelivery,
            origin: mockTrackingData.delivery.origin,
            destination: mockTrackingData.delivery.destination,
            customer: mockTrackingData.customer,
            items: mockTrackingData.items,
            trackingUpdates: mockTrackingData.delivery.trackingUpdates
          }
          
          setTrackingInfo(formattedData)
          setLoading(false)
        })
      } catch (error) {
        setError('Erro ao buscar informações')
        setLoading(false)
      }
    }

    fetchTrackingInfo()
  }, [code])

  const handleFeedback = (isPositive: boolean) => {
    setFeedbackSent(true)
    toast.success(
      isPositive 
        ? 'Obrigado pelo feedback positivo!' 
        : 'Agradecemos seu feedback. Vamos melhorar!',
      {
        duration: 3000,
        icon: isPositive ? '👍' : '👎',
        className: isDarkMode ? 'dark' : ''
      }
    )
  }

  // Função para calcular a previsão de entrega (7 dias após o primeiro email)
  const calculateEstimatedDelivery = (updates: TrackingUpdate[]) => {
    if (!updates || updates.length === 0) return "Calculando"
    
    const firstUpdate = updates[updates.length - 1] // Pega o primeiro update (último do array)
    const startDate = new Date(firstUpdate.createdAt)
    const deliveryDate = new Date(startDate)
    deliveryDate.setDate(deliveryDate.getDate() + 7)
    
    return format(deliveryDate, "dd/MM/yyyy", { locale: ptBR })
  }

  // Função para calcular o tempo estimado restante
  const calculateEstimatedWaitTime = (updates: TrackingUpdate[]) => {
    if (!updates || updates.length === 0) return "Calculando"
    
    const firstUpdate = updates[updates.length - 1]
    const startDate = new Date(firstUpdate.createdAt)
    const today = new Date()
    const deliveryDate = new Date(startDate)
    deliveryDate.setDate(deliveryDate.getDate() + 7)
    
    const daysRemaining = Math.ceil((deliveryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    // Se passou dos 7 dias, mostra "Em Processo Aduaneiro"
    if (daysRemaining <= 0) return "Em Processo Aduaneiro"
    
    return `${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}`
  }

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsClosing(false)
    }, 300) // Tempo da animação
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    )
  }

  if (!trackingInfo) {
    return null
  }

  return (
    <>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Cabeçalho com Logo */}
          <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">
                  Número de Rastreamento
                </h1>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-xl font-mono dark:text-white">{trackingInfo.trackingCode}</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(trackingInfo.trackingCode)
                      toast.success('Código copiado!', {
                        className: isDarkMode ? 'dark' : ''
                      })
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              {trackingInfo.urgentDelivery && (
                <span className="px-4 py-1 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-full border border-red-200 dark:border-red-800 text-sm font-medium">
                  Entrega Urgente
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Previsão de Entrega</p>
                <p className="font-medium dark:text-white">
                  {calculateEstimatedDelivery(trackingInfo.trackingUpdates)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Tempo de Espera Estimado</p>
                <p className="font-medium dark:text-white">
                  {calculateEstimatedWaitTime(trackingInfo.trackingUpdates)}
                </p>
              </div>
            </div>
          </div>

          {/* Status Atual */}
          <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                statusTranslations[trackingInfo.status]?.color || 'bg-gray-100 text-gray-600'
              }`}>
                {React.createElement(statusTranslations[trackingInfo.status]?.icon || Package, {
                  className: "w-6 h-6"
                })}
              </div>
              <div>
                <h2 className="text-lg font-semibold dark:text-white">
                  Status: {statusTranslations[trackingInfo.status]?.text || trackingInfo.status}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {trackingInfo.trackingUpdates[0]?.location}
                </p>
              </div>
            </div>
          </div>

          {/* Botão de Consultar Pendências em card separado */}
          {trackingInfo.status === 'pending' && (
            <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <div className="text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg 
                    transition-all duration-300 font-medium text-lg shadow-lg
                    hover:shadow-xl animate-gentlePulse"
                >
                  Consultar Pendências
                </button>
              </div>
            </div>
          )}

          {/* Detalhes do Pedido - Movido para cima */}
          {trackingInfo.customer && (
            <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Detalhes do Pedido</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-md font-medium mb-2 dark:text-white">Endereço de Entrega</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <p>{trackingInfo.customer.name || 'Nome não informado'}</p>
                    {trackingInfo.customer.address && (
                      <>
                        <p>
                          {trackingInfo.customer.address.street || ''}, 
                          {trackingInfo.customer.address.streetNumber || ''}
                        </p>
                        {trackingInfo.customer.address.complement && (
                          <p>{trackingInfo.customer.address.complement}</p>
                        )}
                        <p>
                          {trackingInfo.customer.address.neighborhood || ''}, 
                          {trackingInfo.customer.address.city || ''}
                        </p>
                        <p>
                          {trackingInfo.customer.address.state || ''} 
                          {trackingInfo.customer.address.zipCode && ` - CEP: ${trackingInfo.customer.address.zipCode}`}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2 dark:text-white">Informações do Pacote</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {trackingInfo.origin && (
                      <p><span className="font-medium">Origem:</span> {trackingInfo.origin}</p>
                    )}
                    {trackingInfo.items && trackingInfo.items.length > 0 && (
                      <>
                        <p><span className="font-medium">Itens:</span></p>
                        <ul className="list-disc pl-4 space-y-1">
                          {trackingInfo.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity}x {item.title}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline com Design Atualizado */}
          <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6 dark:text-white">Histórico de Atualizações</h2>
            <div className="space-y-0">
              {trackingInfo.trackingUpdates.map((update, index) => (
                <div key={index} className="relative pb-8">
                  {index !== trackingInfo.trackingUpdates.length - 1 && (
                    <div className="absolute left-4 top-8 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
                  )}
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {format(new Date(update.createdAt), "dd MMM", { locale: ptBR })}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {format(new Date(update.createdAt), "HH:mm")}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex items-center mb-1">
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 && trackingInfo.status === 'pending' 
                            ? 'bg-red-500' 
                            : index === 0 
                              ? 'bg-green-500' 
                              : 'bg-gray-400'
                        } mr-2`} />
                        <p className="font-medium text-gray-900 dark:text-white">
                          {update.location}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {trackingInfo.status === 'pending' && index === 0 
                          ? 'Objeto Aguardando Liberação'
                          : update.status}
                      </p>
                      {update.description && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {update.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avaliação do Serviço */}
          {!feedbackSent ? (
            <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Como foi nosso serviço?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleFeedback(true)}
                  className="flex items-center justify-center space-x-2 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">👍</span>
                  <span className="font-medium dark:text-white">Foi ótimo</span>
                </button>
                <button 
                  onClick={() => handleFeedback(false)}
                  className="flex items-center justify-center space-x-2 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl">👎</span>
                  <span className="font-medium dark:text-white">Não foi bom</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
              <div className="text-center">
                <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold dark:text-white">Feedback Enviado!</h2>
                <p className="text-gray-500 dark:text-gray-400">Obrigado por avaliar nosso serviço.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Atualizado - Removidas as referências ao CARRIER_NAME */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre</h3>
              <p className="text-gray-400 text-sm">
                Soluções de rastreamento e entrega para todo o Brasil.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/" className="hover:text-white">Rastrear Pacote</a></li>
                <li><a href="/features" className="hover:text-white">Recursos</a></li>
                <li><a href="/about" className="hover:text-white">Sobre Nós</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/help" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="/contact" className="hover:text-white">Fale Conosco</a></li>
                <li><a href="/faq" className="hover:text-white">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacy" className="hover:text-white">Política de Privacidade</a></li>
                <li><a href="/terms" className="hover:text-white">Termos de Uso</a></li>
                <li><a href="/shipping" className="hover:text-white">Termos de Envio</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Pendências com Animação */}
      {(isModalOpen || isClosing) && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay com animação de fade */}
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out
              ${isClosing ? 'opacity-0' : 'opacity-50'}`}
            onClick={handleCloseModal}
          />

          {/* Modal com animação de slide e fade */}
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
            <div 
              className={`relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 
                text-left shadow-xl transition-all duration-300 ease-in-out sm:my-8 sm:w-full sm:max-w-lg
                ${isClosing 
                  ? 'animate-[fadeOut_0.3s_ease-out_forwards,slideOut_0.3s_ease-out_forwards]'
                  : 'animate-[fadeIn_0.3s_ease-out_forwards,slideIn_0.3s_ease-out_forwards]'
                }`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  Pendências
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Informações sobre pendências serão exibidas aqui.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg 
                    hover:bg-gray-300 transition-colors duration-200 
                    dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 