import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';

const SobrePage = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Sobre o Rastreio Express
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
              O Rastreio Express é uma empresa brasileira especializada em soluções de rastreamento de encomendas. Nossa missão é tornar o processo de acompanhamento de entregas o mais simples e transparente possível para todos os brasileiros.
            </p>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Nossa História
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fundada em 2018 por um grupo de especialistas em logística e tecnologia, a Rastreio Express nasceu da percepção de que o processo de acompanhamento de entregas no Brasil poderia ser significativamente melhorado.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Começamos como uma pequena startup focada em desenvolver uma API de rastreamento para e-commerces. Com o tempo, expandimos nossa oferta para incluir uma plataforma completa de rastreamento acessível tanto para empresas quanto para o consumidor final.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Hoje, processamos milhões de consultas de rastreamento mensalmente e estamos em constante evolução para oferecer a melhor experiência possível aos nossos usuários.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nossa Missão e Valores
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Missão
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Proporcionar transparência e tranquilidade no acompanhamento de entregas, conectando remetentes, transportadoras e destinatários através de uma plataforma intuitiva e confiável.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Visão
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ser a plataforma de rastreamento mais completa e acessível do Brasil, simplificando a experiência de logística para todos os envolvidos na cadeia de entregas.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Nossos Valores
              </h3>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-3">
                <li><span className="font-medium text-gray-900 dark:text-white">Transparência</span>: Acreditamos que a informação clara e precisa é essencial para construir confiança.</li>
                <li><span className="font-medium text-gray-900 dark:text-white">Simplicidade</span>: Buscamos tornar complexas operações logísticas compreensíveis para qualquer pessoa.</li>
                <li><span className="font-medium text-gray-900 dark:text-white">Inovação</span>: Estamos constantemente aprimorando nossa tecnologia para oferecer a melhor experiência possível.</li>
                <li><span className="font-medium text-gray-900 dark:text-white">Acessibilidade</span>: Acreditamos que todos têm direito a um rastreamento de qualidade, independentemente do tamanho da operação.</li>
                <li><span className="font-medium text-gray-900 dark:text-white">Segurança</span>: Protegemos os dados dos nossos usuários com os mais altos padrões de segurança.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nossa Equipe
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              O Rastreio Express conta com uma equipe multidisciplinar de profissionais especializados em desenvolvimento de software, logística, atendimento ao cliente e análise de dados. Nossos colaboradores são apaixonados por resolver problemas e melhorar a experiência do usuário.
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Responsabilidade Social
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Acreditamos na importância de contribuir positivamente para a sociedade. Por isso, mantemos iniciativas de responsabilidade social, incluindo:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2 mb-8">
                <li>Programa de inclusão digital para comunidades carentes</li>
                <li>Compensação de carbono para neutralizar o impacto ambiental das entregas rastreadas</li>
                <li>Parcerias com ONGs para apoio à logística de doações</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Estamos comprometidos em fazer a diferença, não apenas no setor de logística, mas também nas comunidades onde atuamos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reutilizando o mesmo footer que está na HomePage */}
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

export default SobrePage; 