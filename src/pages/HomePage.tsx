import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TrackingSearch from '../components/TrackingSearch'
import AboutUs from '../components/AboutUs'
import Features from '../components/Features'

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trackingCode) {
      navigate(`/tracking/${trackingCode}`)
    }
  }

  return (
    <main>
      <section id="track" className="scroll-mt-24">
        <TrackingSearch />
      </section>
      
      <section id="about" className="scroll-mt-16">
        <AboutUs />
      </section>
      
      <section id="features" className="scroll-mt-16">
        <Features />
      </section>
      
      <section id="help" className="py-12 bg-white dark:bg-gray-900 scroll-mt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Ajuda & Suporte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">Fale Conosco</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Precisa de ajuda? Nossa equipe de suporte está disponível 24/7 para ajudá-lo.
              </p>
              <a
                href="/contato"
                className="inline-flex items-center text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Entre em contato 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">Perguntas Frequentes</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Encontre respostas para as perguntas mais comuns sobre nossos serviços.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Ver FAQ 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Sobre Nós</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm">
                Rastreio Express: soluções de rastreamento e entrega para todo o Brasil.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
                <li><a href="#track" className="hover:text-gray-900 dark:hover:text-white">Rastrear Pacote</a></li>
                <li><a href="#features" className="hover:text-gray-900 dark:hover:text-white">Recursos</a></li>
                <li><a href="#about" className="hover:text-gray-900 dark:hover:text-white">Sobre Nós</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Suporte</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
                <li><a href="#help" className="hover:text-gray-900 dark:hover:text-white">Central de Ajuda</a></li>
                <li><a href="/contato" className="hover:text-gray-900 dark:hover:text-white">Fale Conosco</a></li>
                <li><a href="/faq" className="hover:text-gray-900 dark:hover:text-white">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Legal</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-400 text-sm">
                <li><a href="/privacidade" className="hover:text-gray-900 dark:hover:text-white">Política de Privacidade</a></li>
                <li><a href="/termos" className="hover:text-gray-900 dark:hover:text-white">Termos de Uso</a></li>
                <li><a href="/termos-envio" className="hover:text-gray-900 dark:hover:text-white">Termos de Envio</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-700 dark:text-gray-400 text-sm">
            <p>&copy; 2025 Rastreio Express. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}