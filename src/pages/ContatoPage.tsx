import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { Phone, Mail, Clock, MapPin, Briefcase, Users } from 'lucide-react';

const ContatoPage = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Fale Conosco
          </h1>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm mb-10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Estamos à sua disposição
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Queremos ouvir você! Se tiver dúvidas, sugestões ou precisar de ajuda com qualquer aspecto do nosso serviço, 
                  nossa equipe está pronta para atendê-lo pelos canais abaixo:
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        <a href="mailto:atendimento@rastreioexpress.com" className="hover:underline text-blue-600 dark:text-blue-400">
                          atendimento@rastreioexpress.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        Respondemos em até 24 horas úteis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">Atendimento Telefônico</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Entre em contato com nossa central de atendimento para suporte.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        Central de Atendimento com horário estendido
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">Horário de Atendimento</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Segunda a Sexta: 8h às 18h
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sábado: 9h às 13h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">Sede</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Brasil
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Atendimento online em todo território nacional
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 h-64 md:h-full">
                  {/* Representação do mapa - Na implementação real, você usaria um componente de mapa aqui */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                    <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Suporte Nacional
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <Briefcase className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contato Comercial</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Para parcerias, integrações ou soluções empresariais, entre em contato com nossa equipe comercial.
              </p>
              <a 
                href="mailto:comercial@rastreioexpress.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                comercial@rastreioexpress.com
              </a>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <Users className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trabalhe Conosco</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Quer fazer parte da nossa equipe? Envie seu currículo e participe do nosso processo seletivo.
              </p>
              <a 
                href="mailto:rh@rastreioexpress.com" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                rh@rastreioexpress.com
              </a>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Precisa de suporte?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Se você estiver com problemas específicos com uma entrega ou serviço, recomendamos que acesse nossa Central de Ajuda, 
              onde você encontrará formulários específicos para cada tipo de solicitação.
            </p>
            <a 
              href="/ajuda"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-block"
            >
              Acessar Central de Ajuda
            </a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Presença Nacional
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A Rastreio Express possui presença em todo o território brasileiro, com atendimento online 
              abrangente e eficiente para todos os estados e principais cidades do país. Nossa estrutura 
              digital nos permite oferecer suporte completo independentemente da sua localização.
            </p>
          </div>
        </div>
      </div>

      {/* Reutilizando o mesmo footer que está nas outras páginas */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sobre Nós</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Rastreio Express: soluções de rastreamento e entrega para todo o Brasil.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="/" className="hover:text-gray-900 dark:hover:text-white">Rastrear Pacote</a></li>
                <li><a href="/recursos" className="hover:text-gray-900 dark:hover:text-white">Recursos</a></li>
                <li><a href="/sobre" className="hover:text-gray-900 dark:hover:text-white">Sobre Nós</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Suporte</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="/ajuda" className="hover:text-gray-900 dark:hover:text-white">Central de Ajuda</a></li>
                <li><a href="/contato" className="hover:text-gray-900 dark:hover:text-white">Fale Conosco</a></li>
                <li><a href="/faq" className="hover:text-gray-900 dark:hover:text-white">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><a href="/privacidade" className="hover:text-gray-900 dark:hover:text-white">Política de Privacidade</a></li>
                <li><a href="/termos" className="hover:text-gray-900 dark:hover:text-white">Termos de Uso</a></li>
                <li><a href="/termos-envio" className="hover:text-gray-900 dark:hover:text-white">Termos de Envio</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            <p>&copy; 2025 Rastreio Express. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContatoPage; 