import { CheckCircle } from 'lucide-react'

const benefits = [
  'Tempos de entrega líderes do setor',
  'Tecnologia avançada de rastreamento',
  'Manuseio e cuidado profissional',
  'Preços competitivos de envio'
]

export default function AboutUs() {
  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Centro de distribuição moderno com caminhões"
                className="object-cover w-full h-full rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-xl -z-10"></div>
          </div>

          <div className="lg:pl-8">
            <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Sobre a RastreioExpress
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Entregando Excelência Desde 1995
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              A RastreioExpress revolucionou o setor de entregas com soluções inovadoras 
              e compromisso inabalável com a satisfação do cliente. Nossa rede global e 
              tecnologia de ponta garantem que suas encomendas cheguem ao destino com 
              segurança e pontualidade.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-700 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-gray-300 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium 
                       rounded-lg text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 
                       dark:hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Saiba Mais Sobre Nós
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}