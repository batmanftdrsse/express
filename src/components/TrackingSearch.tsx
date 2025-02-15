import { Search, Package, Truck, MapPin } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const QuickAction = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <button className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all">
    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-3">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
    </div>
    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{description}</p>
  </button>
)

export default function TrackingSearch() {
  const [trackingCode, setTrackingCode] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingCode.trim()) {
      navigate(`/tracking/${trackingCode.trim()}`)
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-12 pb-32">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A90E2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Rastreie sua Encomenda
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Digite seu número de rastreio para obter atualizações em tempo real sobre a localização do seu pacote
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Digite o código de rastreio"
                    className="w-full h-[60px] px-4 py-4 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                             placeholder-gray-500 dark:placeholder-gray-400
                             transition-colors text-lg"
                  />
                  <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-2">
                  Exemplo: RASTR123456789
                </p>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                         h-[60px] px-8 rounded-lg flex items-center justify-center gap-2
                         transition-colors duration-200 text-lg font-semibold shadow-sm
                         hover:shadow-md min-w-[160px] sm:self-start"
              >
                <Search className="h-5 w-5" />
                Rastrear
              </button>
            </form>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <QuickAction 
                icon={Truck}
                title="Enviar Agora"
                description="Criar nova remessa"
              />
              <QuickAction 
                icon={Package}
                title="Cotação Rápida"
                description="Calcular frete"
              />
              <QuickAction 
                icon={MapPin}
                title="Encontrar Local"
                description="Ponto de coleta mais próximo"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10M+', label: 'Entregas Realizadas' },
            { number: '150+', label: 'Países Atendidos' },
            { number: '99.9%', label: 'Entregas no Prazo' },
            { number: '24/7', label: 'Suporte ao Cliente' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}