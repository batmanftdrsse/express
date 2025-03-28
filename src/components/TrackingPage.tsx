import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { dashboardService } from '../services/dashboardService'
import { adsPayService } from '../services/adsPayService'
import { PixModal } from './PixModal'
import { TrackingData, ApiResponse } from '../types/tracking'

export default function TrackingPage() {
  const { code } = useParams<{ code: string }>()
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPendingModal, setShowPendingModal] = useState(false)
  const [isPendingModalVisible, setIsPendingModalVisible] = useState(false)
  const [showPixModal, setShowPixModal] = useState(false)
  const [pixData, setPixData] = useState<{ qrcode_text: string; amount: number } | null>(null)
  const [generatingPix, setGeneratingPix] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [taxValue] = useState(68.95) // Valor fixo da taxa

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
      if (!code) return
      
      try {
        setLoading(true)
        console.log('Iniciando busca de dados para o código:', code)
        
        const response = await fetch(`/api/tracking/${code}`)
        console.log('Status da resposta:', response.status)
        
        if (!response.ok) {
          throw new Error('Pedido não encontrado')
        }

        const data: ApiResponse = await response.json()
        console.log('Dados recebidos:', data)

        setTrackingData({
          id: data.id,
          trackingCode: data.trackingCode,
          status: data.status,
          currentStep: data.currentStep,
          updatedAt: data.updatedAt,
          estimatedDelivery: data.estimatedDelivery,
          destination: data.destination,
          trackingUpdates: data.trackingUpdates
        })

      } catch (err) {
        console.error('Erro ao carregar tracking:', err)
        setError('Falha ao carregar dados do rastreamento')
      } finally {
        setLoading(false)
      }
    }

    loadTrackingData()
  }, [code])

  useEffect(() => {
    if (showPendingModal) {
      setIsPendingModalVisible(true);
    } else {
      const timer = setTimeout(() => setIsPendingModalVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showPendingModal]);

  const handleClosePendingModal = () => {
    setIsPendingModalVisible(false);
    setTimeout(() => setShowPendingModal(false), 300);
  };

  const handleGeneratePix = async () => {
    if (!code) return;
    
    try {
      setGeneratingPix(true);
      const response = await adsPayService.generatePix(code);
      
      setPixData({
        qrcode_text: response.pix.qrcode,
        amount: taxValue
      });
      
      handleClosePendingModal(); // Fecha o modal de pendências com animação
      setShowPixModal(true); // Abre o modal do PIX
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Erro ao gerar o PIX. Por favor, tente novamente.');
    } finally {
      setGeneratingPix(false);
    }
  };

  const handleClosePixModal = () => {
    setShowPixModal(false);
    setShowPendingModal(true); // Reabre o modal de pendências
  };

  const handleFeedback = (isGood: boolean) => {
    setFeedbackSubmitted(true)
    setFeedbackMessage(isGood ? 
      'Obrigado pelo feedback positivo! Estamos felizes em poder ajudar.' :
      'Agradecemos seu feedback. Vamos trabalhar para melhorar nossos serviços.')
    setTimeout(() => {
      setShowFeedback(false)
      setFeedbackSubmitted(false)
    }, 3000)
  }

  useEffect(() => {
    if (!loading && trackingData) {
      const timer = setTimeout(() => {
        setShowFeedback(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [loading, trackingData])

  if (loading) return <div className="text-gray-900 dark:text-white">Carregando...</div>
  if (error) return <div className="text-red-600 dark:text-red-400">{error}</div>
  if (!trackingData || !code) return null

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-8">
      <div className="max-w-3xl mx-auto px-4 pt-12">
        <h1 className="text-2xl font-bold text-left mb-4 text-gray-900 dark:text-white">Rastreie Seu Pedido</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Número de Rastreamento</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-mono text-gray-900 dark:text-white">{code}</span>
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Previsão de Entrega</p>
              <p className="text-lg text-gray-900 dark:text-white">{formatDate(trackingData.estimatedDelivery)}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Tempo de Espera Estimado</p>
              <p className="text-lg text-gray-900 dark:text-white">2 dias</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#3A1616] rounded-full">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Status: {trackingData.status}</h3>
              <p className="text-gray-400">
                {trackingData.destination?.city && trackingData.destination?.state 
                  ? `${trackingData.destination.city}, ${trackingData.destination.state}`
                  : 'Localização não disponível'
                }
              </p>
            </div>
          </div>

          {trackingData.status === 'pending' && (
            <div className="mt-4 border border-red-500/20 rounded-lg p-4 bg-[#332732]">
              <p className="text-red-400 mb-3">
                Há pendências que precisam ser resolvidas para que sua encomenda prossiga.
              </p>
              <button
                onClick={() => setShowPendingModal(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
              >
                Consultar Pendências
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Histórico de Atualizações</h2>
          
          <div className="space-y-6">
            {trackingData.trackingUpdates.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0
                        ? 'bg-red-500' 
                        : 'bg-gray-400'
                    } ${index === 0 ? 'relative z-10' : ''}`}>
                      {index === 0 && (
                        <>
                          <div className="absolute -inset-2 rounded-full bg-red-500/20 animate-pulse"></div>
                          <div className="absolute -inset-4 rounded-full bg-red-500/10 animate-pulse delay-75"></div>
                        </>
                      )}
                    </div>
                  </div>
                  {index < trackingData.trackingUpdates.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                  )}
                </div>
                <div className={`${
                  index === 0
                    ? 'bg-[#332732] p-4 rounded-lg w-full border border-red-500/20' 
                    : ''
                }`}>
                  <p className={`text-sm ${
                    index === 0
                      ? 'text-red-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {formatDate(event.date)}
                  </p>
                  <p className={`font-medium ${
                    index === 0
                      ? 'text-red-400'
                      : 'text-gray-900 dark:text-white'
                  }`}>{event.status}</p>
                  {event.location && (
                    <p className={`${
                      index === 0
                        ? 'text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>{event.location}</p>
                  )}
                  {event.description && (
                    <p className={`${
                      index === 0
                        ? 'text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white text-center">Como foi nosso serviço?</h2>
          
          {!feedbackSubmitted ? (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleFeedback(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span role="img" aria-label="polegar para cima" className="text-xl">👍</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Bom
                </span>
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span role="img" aria-label="polegar para baixo" className="text-xl">👎</span>
                <span className="text-gray-700 dark:text-gray-300">
                  Ruim
                </span>
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-900 dark:text-white text-lg">{feedbackMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer reduzido */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-6 border-t border-gray-200 dark:border-gray-800 mt-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Página Inicial</a>
            <a href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Perguntas Frequentes</a>
            <a href="/contato" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Fale Conosco</a>
            <a href="/privacidade" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Privacidade</a>
            <a href="/termos" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">Termos de Uso</a>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-500 text-sm">
            <p>&copy; 2025 Rastreio Express. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Pendências */}
      {(showPendingModal || isPendingModalVisible) && (
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${
            isPendingModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={handleClosePendingModal}
        >
          <div 
            className={`bg-[#1E1E1E] rounded-xl p-6 max-w-md w-full shadow-2xl transition-all duration-300 ${
              isPendingModalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Pendências</h3>
              <button
                onClick={handleClosePendingModal}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#3A1616] rounded-full shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white mb-2">Motivo da Pendência</h4>
                  <p className="text-gray-400">
                    Aguardando processamento. Sua encomenda está pendente de análise pelo nosso sistema.
                  </p>
                </div>
              </div>
              
              <div className="bg-[#2D2D2D] rounded-lg p-5 space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-1">Taxa Alfandegária</h5>
                  <p className="text-gray-400 text-sm">
                    Para prosseguir com a liberação da sua encomenda, é necessário o pagamento da taxa alfandegária.
                  </p>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm mb-2">
                    Valor da Taxa de Liberação:
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-400">R$</span>
                    <span className="text-2xl font-bold text-indigo-400">
                      {taxValue.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePix}
                  disabled={generatingPix}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-center font-medium flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  {generatingPix ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Gerando PIX...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span>Gerar PIX para Pagamento</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={handleClosePendingModal}
                className="w-full px-4 py-3 bg-[#2D2D2D] text-gray-300 rounded-lg hover:bg-[#353535] transition-colors text-sm"
              >
                Fechar
              </button>
            </div>
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