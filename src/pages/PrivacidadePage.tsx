import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';

const PrivacidadePage = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Política de Privacidade
          </h1>
          
          <div className="prose dark:prose-dark max-w-none text-gray-700 dark:text-gray-300">
            <p className="lead text-lg mb-8">
              A Rastreio Express se compromete a proteger a privacidade e os dados pessoais de nossos clientes. 
              Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos as informações 
              obtidas através de nossos serviços de rastreamento e entrega.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
              <p className="font-medium">
                Última atualização: 15 de Junho de 2024
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Informações que Coletamos
            </h2>
            
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              1.1 Informações Fornecidas pelo Usuário
            </h3>
            <p>
              Podemos coletar informações que você nos fornece diretamente, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Informações de contato (nome, endereço, e-mail, telefone)</li>
              <li>Informações de login e conta</li>
              <li>Informações de entrega e faturamento</li>
              <li>Detalhes sobre suas encomendas e rastreamentos</li>
              <li>Comunicações e feedback que você nos envia</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              1.2 Informações Coletadas Automaticamente
            </h3>
            <p>
              Quando você utiliza nossos serviços online, podemos coletar automaticamente:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Informações do dispositivo (tipo, sistema operacional, navegador)</li>
              <li>Endereço IP e dados de localização aproximada</li>
              <li>Dados de uso do site e padrões de navegação</li>
              <li>Cookies e tecnologias similares</li>
              <li>Informações de rastreamento e histórico de entregas</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Como Utilizamos as Informações
            </h2>
            <p>
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Processar e rastrear suas encomendas</li>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Comunicar atualizações sobre entregas e status de rastreamento</li>
              <li>Atender a solicitações de suporte ao cliente</li>
              <li>Personalizar sua experiência em nossos serviços</li>
              <li>Enviar informações sobre produtos, serviços e promoções (quando autorizado)</li>
              <li>Prevenir fraudes e proteger a segurança de nossos serviços</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Compartilhamento de Informações
            </h2>
            <p>
              Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Parceiros de entrega e logística para cumprir seus pedidos</li>
              <li>Fornecedores de serviços que nos auxiliam em operações comerciais</li>
              <li>Autoridades governamentais para cumprir requisitos legais</li>
              <li>Parceiros comerciais, com seu consentimento prévio</li>
              <li>Em caso de fusão, aquisição ou venda de ativos da empresa</li>
            </ul>
            <p>
              Não vendemos ou alugamos suas informações pessoais a terceiros para fins de marketing.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Segurança das Informações
            </h2>
            <p>
              A Rastreio Express implementa medidas técnicas, administrativas e físicas para proteger suas informações contra acesso não autorizado, 
              perda, uso indevido ou alteração. Algumas das medidas incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Criptografia de dados sensíveis</li>
              <li>Acesso restrito a informações pessoais apenas a funcionários autorizados</li>
              <li>Monitoramento e avaliações regulares de segurança</li>
              <li>Treinamento de equipe sobre práticas de segurança e privacidade</li>
            </ul>
            <p>
              Apesar de nossos esforços, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta das informações.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Seus Direitos e Escolhas
            </h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD) e outras leis aplicáveis, você tem direitos sobre suas informações pessoais, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Acesso às suas informações pessoais</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Eliminação de dados desnecessários ou excessivos</li>
              <li>Portabilidade de dados para outro fornecedor de serviços</li>
              <li>Revogação do consentimento para tratamento de dados</li>
              <li>Oposição ao tratamento em determinadas circunstâncias</li>
            </ul>
            <p>
              Para exercer esses direitos, entre em contato conosco através dos canais indicados ao final desta política.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Cookies e Tecnologias Similares
            </h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, entender como você interage com nossos serviços
              e personalizar conteúdos e anúncios. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
            </p>
            <p>
              Para mais informações sobre como utilizamos cookies, consulte nossa Política de Cookies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Transferências Internacionais de Dados
            </h2>
            <p>
              Como parte das nossas operações globais, podemos transferir, armazenar e processar suas informações em outros países além do Brasil. 
              Tomamos medidas para garantir que essas transferências ocorram em conformidade com as leis aplicáveis de proteção de dados e com níveis 
              adequados de proteção.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Retenção de Dados
            </h2>
            <p>
              Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que um período de 
              retenção mais longo seja exigido ou permitido por lei. Os critérios utilizados para determinar nossos períodos de retenção incluem:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>O período necessário para fornecer nossos serviços</li>
              <li>Obrigações legais e regulatórias</li>
              <li>Prazos de prescrição aplicáveis para eventuais disputas legais</li>
              <li>Diretrizes e recomendações de autoridades de proteção de dados</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Privacidade de Crianças
            </h2>
            <p>
              Nossos serviços não são direcionados a menores de 18 anos, e não coletamos intencionalmente informações pessoais de crianças. 
              Se você acredita que coletamos informações de um menor, entre em contato conosco para que possamos tomar as medidas necessárias.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Alterações a Esta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por outros motivos operacionais, 
              legais ou regulatórios. Notificaremos você sobre quaisquer alterações materiais através do nosso site ou outros canais de comunicação. 
              Recomendamos que você revise esta política regularmente.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Entre em Contato
            </h2>
            <p>
              Se você tiver dúvidas, preocupações ou solicitações relacionadas à sua privacidade ou a esta política, entre em contato com nosso 
              Encarregado de Proteção de Dados (DPO):
            </p>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm mt-4 mb-8">
              <p className="mb-2"><strong>E-mail:</strong> <a href="mailto:privacidade@rastreioexpress.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacidade@rastreioexpress.com</a></p>
              <p><strong>Site:</strong> <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">www.rastreioexpress.com</a></p>
            </div>
            <p>
              Respondemos a todas as solicitações que recebemos de indivíduos que desejam exercer seus direitos de proteção de dados de acordo
              com as leis de proteção de dados aplicáveis.
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

export default PrivacidadePage; 