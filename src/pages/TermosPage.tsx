import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';

const TermosPage = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Termos de Uso
          </h1>
          
          <div className="prose dark:prose-dark max-w-none text-gray-700 dark:text-gray-300">
            <p className="lead text-lg mb-8">
              Estes Termos de Uso estabelecem as regras para utilização dos serviços oferecidos pela Rastreio Express. 
              Ao acessar ou utilizar nossos serviços, você concorda com estes termos, portanto, recomendamos 
              que leia atentamente este documento.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
              <p className="font-medium">
                Última atualização: 15 de Junho de 2024
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar os serviços da Rastreio Express, incluindo nosso site, aplicativo móvel, API, 
              sistema de rastreamento, serviços de entrega e outros recursos relacionados (coletivamente 
              denominados "Serviços"), você concorda com estes Termos de Uso e com nossa 
              Política de Privacidade. Se você não concordar com estes termos, por favor, 
              não utilize nossos Serviços.
            </p>
            <p>
              Podemos modificar estes termos a qualquer momento, e seu uso contínuo dos Serviços após tais
              modificações constitui sua aceitação dos termos atualizados. Recomendamos que você verifique
              regularmente esta página para estar ciente de quaisquer alterações.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Descrição dos Serviços
            </h2>
            <p>
              A Rastreio Express oferece serviços de rastreamento de encomendas, sistema de notificações,
              integração com e-commerce, API para desenvolvedores, consultoria em logística, entre outros
              serviços relacionados à cadeia de entregas e logística. Nossos Serviços permitem que usuários,
              empresas e parceiros acompanhem o status de suas encomendas em tempo real.
            </p>
            <p>
              Alguns de nossos Serviços podem estar sujeitos a termos adicionais específicos, que serão
              apresentados no momento da contratação ou utilização desses Serviços.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Cadastro e Contas de Usuário
            </h2>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              3.1. Registro
            </h3>
            <p>
              Para acessar determinados recursos de nossos Serviços, você pode precisar criar uma conta. 
              Ao se registrar, você concorda em fornecer informações precisas, atualizadas e completas. 
              Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que
              ocorrerem em sua conta.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              3.2. Uso da Conta
            </h3>
            <p>
              Você concorda em notificar imediatamente a Rastreio Express sobre qualquer uso não autorizado de sua
              conta ou qualquer outra violação de segurança. A Rastreio Express não será responsável por quaisquer
              perdas resultantes do uso não autorizado de sua conta, desde que não tenha contribuído para tal acesso.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              3.3. Restrições de Idade
            </h3>
            <p>
              Nossos Serviços não são destinados a menores de 18 anos. Ao criar uma conta, você declara que tem pelo
              menos 18 anos ou, se for menor, que está sob supervisão de um responsável legal que concorda com estes
              Termos em seu nome.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Uso dos Serviços
            </h2>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              4.1. Uso Permitido
            </h3>
            <p>
              Você concorda em utilizar nossos Serviços apenas para fins legais e de acordo com estes Termos.
              Você pode utilizar nossos Serviços para rastrear encomendas, receber notificações, integrar com
              sistemas de e-commerce e outros fins relacionados, conforme permitido pela Rastreio Express.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              4.2. Restrições de Uso
            </h3>
            <p>
              Ao utilizar nossos Serviços, você concorda em não:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violar quaisquer leis ou regulamentos aplicáveis;</li>
              <li>Infringir os direitos de propriedade intelectual ou outros direitos da Rastreio Express ou de terceiros;</li>
              <li>Tentar obter acesso não autorizado aos nossos sistemas, servidores ou redes;</li>
              <li>Interferir no funcionamento adequado dos Serviços;</li>
              <li>Utilizar robôs, crawlers ou outros métodos automatizados para acessar os Serviços sem autorização expressa;</li>
              <li>Transmitir vírus, malware ou qualquer código de natureza destrutiva;</li>
              <li>Coletar ou rastrear informações pessoais de outros usuários;</li>
              <li>Realizar engenharia reversa, descompilar ou desmontar qualquer parte dos Serviços;</li>
              <li>Utilizar os Serviços para fins ilegais, fraudulentos ou não autorizados.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Propriedade Intelectual
            </h2>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              5.1. Direitos da Rastreio Express
            </h3>
            <p>
              Todo o conteúdo presente nos Serviços, incluindo mas não se limitando a textos, gráficos, logotipos,
              ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é de propriedade
              da Rastreio Express ou de seus fornecedores e está protegido por leis de direitos autorais, marcas
              registradas e outras leis de propriedade intelectual.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              5.2. Licença Limitada
            </h3>
            <p>
              A Rastreio Express concede a você uma licença limitada, não exclusiva, não transferível e revogável
              para acessar e utilizar os Serviços para seus fins pessoais ou comerciais, sujeito a estes Termos.
              Esta licença não inclui o direito de:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Revender ou usar comercialmente os Serviços ou seu conteúdo;</li>
              <li>Reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte dos Serviços;</li>
              <li>Acessar os Serviços para criar um produto ou serviço concorrente;</li>
              <li>Utilizar qualquer técnica de mineração de dados, robôs ou métodos similares de coleta e extração de dados.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Conteúdo do Usuário
            </h2>
            <p>
              Ao fornecer qualquer conteúdo para os Serviços, como comentários, avaliações ou feedback, você
              concede à Rastreio Express uma licença perpétua, irrevogável, mundial, livre de royalties, sublicenciável
              e transferível para usar, reproduzir, modificar, adaptar, publicar, traduzir, criar trabalhos derivados,
              distribuir e exibir tal conteúdo em qualquer mídia.
            </p>
            <p>
              Você é o único responsável por qualquer conteúdo que forneça e pelas consequências de compartilhá-lo.
              A Rastreio Express não endossa nenhum conteúdo enviado por qualquer usuário ou terceiro.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Privacidade
            </h2>
            <p>
              Sua privacidade é importante para nós. Nossa <a href="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</a> descreve como coletamos,
              usamos e protegemos suas informações pessoais. Ao usar nossos Serviços, você concorda com os termos
              da nossa Política de Privacidade.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Serviços de Terceiros
            </h2>
            <p>
              Nossos Serviços podem conter links para sites, aplicativos ou serviços de terceiros que não são
              de propriedade ou controlados pela Rastreio Express. Não temos controle sobre, e não assumimos
              responsabilidade pelo conteúdo, políticas de privacidade ou práticas de sites ou serviços de terceiros.
            </p>
            <p>
              Além disso, a Rastreio Express não será responsável por quaisquer perdas, danos ou outros problemas
              decorrentes do seu uso de serviços de terceiros. Recomendamos que você leia os termos e políticas
              de privacidade de qualquer site ou serviço de terceiros que você visitar ou utilizar.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Limitação de Responsabilidade
            </h2>
            <p>
              Na extensão máxima permitida pela lei aplicável, a Rastreio Express, seus diretores, funcionários,
              parceiros, agentes, fornecedores ou afiliados não serão responsáveis por quaisquer danos diretos,
              indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, mas não se limitando a,
              perda de lucros, dados, uso, reputação ou outras perdas intangíveis, resultantes de:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Seu acesso ou uso ou incapacidade de acessar ou usar os Serviços;</li>
              <li>Qualquer conduta ou conteúdo de terceiros nos Serviços;</li>
              <li>Conteúdo obtido dos Serviços;</li>
              <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Indenização
            </h2>
            <p>
              Você concorda em defender, indenizar e isentar a Rastreio Express, seus diretores, funcionários,
              parceiros, agentes, contratados, licenciadores, fornecedores de serviços e afiliados de e contra
              quaisquer reclamações, responsabilidades, danos, julgamentos, prêmios, perdas, custos, despesas
              ou taxas (incluindo honorários advocatícios razoáveis) resultantes de ou decorrentes de sua
              violação destes Termos.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Rescisão
            </h2>
            <p>
              A Rastreio Express pode encerrar ou suspender seu acesso aos Serviços imediatamente, sem aviso
              prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes
              Termos.
            </p>
            <p>
              Após o término, seu direito de usar os Serviços cessará imediatamente. Se você deseja encerrar
              sua conta, você pode simplesmente descontinuar o uso dos Serviços ou entrar em contato conosco
              para solicitar o encerramento de sua conta.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              12. Lei Aplicável e Jurisdição
            </h2>
            <p>
              Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas
              disposições de conflito de leis. Qualquer disputa legal decorrente ou relacionada a estes Termos
              será submetida à jurisdição exclusiva dos tribunais da cidade de São Paulo, Brasil.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              13. Disposições Gerais
            </h2>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              13.1. Acordo Integral
            </h3>
            <p>
              Estes Termos constituem o acordo integral entre você e a Rastreio Express em relação aos
              Serviços e substituem todos os acordos anteriores ou contemporâneos, escritos ou orais,
              relacionados a este assunto.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              13.2. Renúncia e Independência das Cláusulas
            </h3>
            <p>
              A falha da Rastreio Express em fazer valer qualquer direito ou disposição destes Termos não
              constituirá uma renúncia a esse direito ou disposição. Se qualquer disposição destes Termos
              for considerada inválida ou inexequível por um tribunal, as disposições restantes permanecerão
              em pleno vigor e efeito.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              13.3. Cessão
            </h3>
            <p>
              Você não pode ceder ou transferir estes Termos, por força de lei ou de outra forma, sem o
              consentimento prévio por escrito da Rastreio Express. Qualquer tentativa de cessão ou
              transferência sem tal consentimento será nula. A Rastreio Express pode ceder ou transferir
              estes Termos sem restrições.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              13.4. Força Maior
            </h3>
            <p>
              A Rastreio Express não será responsável por qualquer falha ou atraso no cumprimento de suas
              obrigações resultantes de causas além do seu controle razoável, incluindo, mas não se limitando
              a, desastres naturais, pandemias, guerras, terrorismo, tumultos, embargos, atos de autoridades
              civis ou militares, incêndios, inundações, acidentes, greves ou escassez de transporte,
              combustível, energia, mão de obra ou materiais.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              14. Entre em Contato
            </h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco:
            </p>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm mt-4 mb-8">
              <p className="mb-2"><strong>E-mail:</strong> <a href="mailto:juridico@rastreioexpress.com" className="text-blue-600 dark:text-blue-400 hover:underline">juridico@rastreioexpress.com</a></p>
              <p className="mb-2"><strong>Endereço:</strong> Avenida Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</p>
            </div>
            <p className="text-center italic">
              Obrigado por escolher a Rastreio Express!
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

export default TermosPage; 