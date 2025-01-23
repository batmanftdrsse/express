import { Truck, Package, Globe, Clock, Mail, Box, Shield, Headphones } from 'lucide-react'

const features = [
  {
    icon: <Package className="h-8 w-8" />,
    title: 'Rastreamento de Pacotes',
    description: 'Acompanhamento em tempo real com atualizações detalhadas e notificações'
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Entrega Expressa',
    description: 'Opções de entrega no dia seguinte e no mesmo dia para pacotes urgentes'
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'Cobertura Global',
    description: 'Envios internacionais para mais de 150 países em todo o mundo'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Envio Seguro',
    description: 'Proteção e seguro de pacotes para sua tranquilidade'
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: 'Suporte 24/7',
    description: 'Atendimento ao cliente e assistência 24 horas por dia'
  },
  {
    icon: <Box className="h-8 w-8" />,
    title: 'Opções Flexíveis',
    description: 'Múltiplas velocidades de envio e níveis de serviço para escolher'
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Por que Escolher a RastreioExpress?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Experimente serviços de envio de classe mundial com recursos projetados para tornar sua logística simples e eficiente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 
                       transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg group-hover:bg-blue-200 
                              dark:group-hover:bg-blue-800/50 transition-colors">
                    <div className="text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}