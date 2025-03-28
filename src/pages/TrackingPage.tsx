import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { dashboardService } from '../services/dashboardService'
import { adsPayService } from '../services/adsPayService'
import { PixModal } from '../components/PixModal'

interface TrackingData {
  status: 'pending' | 'paid' | 'in_transit' | 'delivered'
  updatedAt: string
  history: Array<{
    status: string
    date: string
    location?: string
    description?: string
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
  trackingCode: string
}

interface ApiResponse {
  trackingCode: string
  status: 'waiting_payment' | 'paid' | 'in_transit' | 'delivered'
  currentStep: number
  updatedAt: string
  estimatedDelivery: string
  destination: {
    recipient: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  trackingUpdates: Array<{
    status: string
    date: string
    location?: string
    description?: string
  }>
}

export default function TrackingPage() {
  const { trackingCode } = useParams()
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPendingModal, setShowPendingModal] = useState(false)
  const [showPixModal, setShowPixModal] = useState(false)
  const [pixData, setPixData] = useState<{ qrcode_text: string } | null>(null)
  const [generatingPix, setGeneratingPix] = useState(false)

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Data não disponível'
    try {
      const date = parseISO(dateString)
      return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    } catch (err) {
      console.error('Erro ao formatar data:', dateString, err)
      return 'Data inválida'
    }
  }

  useEffect(() => {
    async function loadTrackingData() {
      if (!trackingCode) return
      
      try {
        setLoading(true)
        console.log('Iniciando busca de dados para o código:', trackingCode)
        
        const response = await fetch(`/api/tracking/${trackingCode}`)
        console.log('Status da resposta:', response.status)
        
        if (!response.ok) {
          throw new Error('Pedido não encontrado')
        }

        const data: ApiResponse = await response.json()
        console.log('Dados recebidos:', data)

        setTrackingData({
          trackingCode: data.trackingCode,
          status: data.status === 'waiting_payment' ? 'pending' : data.status,
          updatedAt: data.updatedAt,
          history: data.trackingUpdates?.map(update => ({
            status: update.status,
            date: update.date,
            location: update.location,
            description: update.description
          })) || [],
          estimatedDelivery: data.estimatedDelivery,
          currentStatus: data.status === 'waiting_payment' ? 'pending' : data.status,
          deliveryAddress: data.destination
        })

      } catch (err) {
        console.error('Erro ao carregar tracking:', err)
        setError('Falha ao carregar dados do rastreamento')
      } finally {
        setLoading(false)
      }
    }

    loadTrackingData()
  }, [trackingCode])

  const handleGeneratePix = async () => {
    if (!trackingCode) return;
    
    try {
      setGeneratingPix(true);
      const response = await adsPayService.generatePix(trackingCode);
      setPixData(response);
      setShowPixModal(true);
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Erro ao gerar o PIX. Por favor, tente novamente.');
    } finally {
      setGeneratingPix(false);
    }
  };

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
              <p className="text-lg">{formatDate(trackingData.estimatedDelivery)}</p>
            </div>
            <div>
              <p className="text-gray-400">Tempo de Espera Estimado</p>
              <p className="text-lg">2 dias</p>
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
              <h3 className="text-lg font-medium">Status: {trackingData.currentStatus}</h3>
              <p className="text-gray-400">
                {trackingData.deliveryAddress?.city && trackingData.deliveryAddress?.state 
                  ? `${trackingData.deliveryAddress.city}, ${trackingData.deliveryAddress.state}`
                  : 'Localização não disponível'
                }
              </p>
            </div>
          </div>

          {(trackingData.status === 'pending' || trackingData.currentStatus === 'pending') && (
            <div className="mt-4 border border-amber-500/20 rounded-lg p-4">
              <p className="text-amber-500 mb-3">
                Há pendências que precisam ser resolvidas para que sua encomenda prossiga.
              </p>
              <button
                onClick={() => setShowPendingModal(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors"
              >
                Consultar Pendências
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Detalhes do Pedido</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Endereço de Entrega
                </h3>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-white font-medium">{trackingData.deliveryAddress?.recipient}</p>
                  <p className="text-gray-300">
                    {trackingData.deliveryAddress?.street}, {trackingData.deliveryAddress?.number}
                  </p>
                  <p className="text-gray-300">
                    {trackingData.deliveryAddress?.neighborhood}, {trackingData.deliveryAddress?.city}
                  </p>
                  <p className="text-gray-300">
                    {trackingData.deliveryAddress?.state} - CEP: {trackingData.deliveryAddress?.zipCode}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Status do Pedido
                </h3>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-white font-medium capitalize">{trackingData.status}</p>
                  <p className="text-gray-300">Última atualização: {formatDate(trackingData.updatedAt)}</p>
                </div>
              </div>
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
                    {formatDate(event.date)}
                  </p>
                  <p className="font-medium">{event.status}</p>
                  {event.location && (
                    <p className="text-gray-400">{event.location}</p>
                  )}
                  {event.description && (
                    <p className="text-gray-400">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Pendências */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Pendências</h3>
              <button
                onClick={() => setShowPendingModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-600/20 rounded-full">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium">Motivo da Pendência</h4>
              </div>
              
              <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
                <p className="text-gray-300 mb-4">
                  Aguardando processamento. Sua encomenda está pendente de análise pelo nosso sistema.
                </p>

                <p className="text-white font-medium mb-2">
                  Valor da Taxa de Liberação:
                </p>
                <p className="text-2xl font-bold text-indigo-400 mb-4">
                  R$ 68,95
                </p>

                <button
                  onClick={handleGeneratePix}
                  disabled={generatingPix}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center font-medium flex items-center justify-center gap-2"
                >
                  {generatingPix ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      Gerar PIX para Pagamento
                    </>
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowPendingModal(false)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Modal do PIX */}
      {pixData && (
        <PixModal
          isOpen={showPixModal}
          onClose={() => setShowPixModal(false)}
          qrCodeText={pixData.qrcode_text}
          amount={68.95}
        />
      )}
    </div>
  )
} 