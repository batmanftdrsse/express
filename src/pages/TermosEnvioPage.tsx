import React from 'react';
import { PublicNavbar } from '../components/PublicNavbar';

const TermosEnvioPage = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Termos de Envio
          </h1>
          
          <div className="prose dark:prose-dark max-w-none text-gray-700 dark:text-gray-300">
            <p className="lead text-lg mb-8">
              Os Termos de Envio da Rastreio Express estabelecem as condições aplicáveis aos serviços de envio
              e rastreamento de encomendas, bem como as responsabilidades das partes envolvidas. 
              Ao utilizar nossos serviços, você concorda com estes termos.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
              <p className="font-medium">
                Última atualização: 15 de Junho de 2024
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              1. Definições
            </h2>
            <p>
              Para os fins destes Termos de Envio, os seguintes termos terão os significados indicados abaixo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>"Rastreio Express"</strong>: refere-se à Rastreio Express Logística S.A., suas subsidiárias, afiliadas e parceiros de entrega;</li>
              <li><strong>"Remetente"</strong>: pessoa física ou jurídica que contrata os serviços de envio;</li>
              <li><strong>"Destinatário"</strong>: pessoa física ou jurídica indicada como receptora da encomenda;</li>
              <li><strong>"Encomenda"</strong>: objeto, pacote, documento ou mercadoria confiada à Rastreio Express para transporte e entrega;</li>
              <li><strong>"Serviços"</strong>: atividades de coleta, transporte, entrega e rastreamento de encomendas realizadas pela Rastreio Express;</li>
              <li><strong>"Guia de Remessa"</strong>: documento que comprova a expedição da encomenda e contém informações sobre o envio;</li>
              <li><strong>"Website"</strong>: o site da Rastreio Express (www.rastreioexpress.com) e aplicativos relacionados.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              2. Aceitação dos Serviços
            </h2>
            <p>
              A Rastreio Express se reserva o direito de recusar, cancelar, atrasar ou devolver qualquer encomenda, a seu exclusivo critério, 
              particularmente quando:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>O transporte da encomenda é proibido por lei ou regulamentação em qualquer país de origem, destino ou trânsito;</li>
              <li>A encomenda contém artigos proibidos ou perigosos conforme definido na seção 3 destes Termos;</li>
              <li>A declaração de conteúdo ou valor da encomenda é inexata ou incompleta;</li>
              <li>A embalagem é inadequada ou insuficiente para garantir o transporte seguro;</li>
              <li>O endereço de entrega está incompleto, ilegível ou não existe.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              3. Artigos Proibidos
            </h2>
            <p>
              A Rastreio Express não aceita os seguintes artigos para transporte, salvo acordo específico por escrito:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Dinheiro, moedas, títulos ao portador, cheques, vales, cartões de crédito/débito, bilhetes de loteria;</li>
              <li>Joias, metais preciosos, pedras preciosas, obras de arte, antiguidades ou outros artigos de valor excepcional;</li>
              <li>Plantas e animais vivos ou mortos, materiais biológicos, restos humanos ou cinzas;</li>
              <li>Armas de fogo, munições, explosivos, fogos de artifício ou qualquer dispositivo militar;</li>
              <li>Drogas ilegais, medicamentos controlados sem prescrição adequada, substâncias psicotrópicas;</li>
              <li>Materiais perigosos, inflamáveis, tóxicos, corrosivos ou radioativos;</li>
              <li>Produtos perecíveis que necessitem de refrigeração ou condições ambientais específicas;</li>
              <li>Mercadorias contrafeitas, pirateadas ou que violem direitos de propriedade intelectual;</li>
              <li>Artigos obscenos, difamatórios ou que violem leis de qualquer país de origem, trânsito ou destino.</li>
            </ul>
            <p>
              O Remetente será responsável por todos os danos e custos decorrentes do envio de artigos proibidos, 
              incluindo custos de inspeção, armazenamento, devolução ou destruição.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              4. Embalagem e Etiquetagem
            </h2>
            <p>
              O Remetente é responsável por garantir que cada encomenda seja:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Adequadamente embalada para resistir às condições normais de transporte, considerando a natureza do conteúdo;</li>
              <li>Etiquetada com informações completas e precisas do Remetente e do Destinatário;</li>
              <li>Acompanhada de toda documentação necessária para transporte, incluindo documentos aduaneiros quando aplicável;</li>
              <li>Fechada de forma a proteger o conteúdo contra perda ou dano e impedir acesso não autorizado.</li>
            </ul>
            <p>
              A Rastreio Express não assume responsabilidade por perdas ou danos resultantes de embalagem inadequada ou insuficiente.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              5. Inspeção
            </h2>
            <p>
              A Rastreio Express pode, mas não é obrigada a, abrir e inspecionar qualquer encomenda por motivos de segurança, 
              alfândega ou outros requisitos regulatórios. As autoridades governamentais, incluindo alfândega, também podem 
              abrir e inspecionar qualquer encomenda a qualquer momento.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              6. Tarifas e Taxas
            </h2>
            <p>
              As tarifas de envio são calculadas com base no peso, dimensões, destino, prazo de entrega e serviços adicionais selecionados.
              Além das tarifas básicas, podem ser aplicadas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Taxas de manuseio para artigos que exijam tratamento especial;</li>
              <li>Taxas de combustível e outros sobretaxas operacionais;</li>
              <li>Taxas alfandegárias, impostos e encargos governamentais;</li>
              <li>Taxas por serviços adicionais, como seguro, entrega aos sábados, confirmação de entrega, etc.</li>
            </ul>
            <p>
              O Remetente concorda em pagar todas as tarifas e taxas associadas ao serviço solicitado. Se o Destinatário ou 
              terceiro for designado como responsável pelo pagamento, e este não efetuar o pagamento, o Remetente permanece 
              responsável pelo pagamento integral.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              7. Prazos de Entrega
            </h2>
            <p>
              A Rastreio Express envidará esforços razoáveis para entregar as encomendas de acordo com os prazos estimados, 
              mas estes não são garantidos e não fazem parte do contrato de transporte. A Rastreio Express não será responsável 
              por quaisquer danos ou perdas decorrentes de atrasos na entrega.
            </p>
            <p>
              Fatores que podem afetar os prazos de entrega incluem, mas não se limitam a:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Condições climáticas adversas ou desastres naturais;</li>
              <li>Interrupções no transporte ou problemas de infraestrutura;</li>
              <li>Atrasos alfandegários ou intervenções governamentais;</li>
              <li>Endereço incorreto ou informações de contato incompletas;</li>
              <li>Ausência do Destinatário para recebimento;</li>
              <li>Necessidade de inspeção ou verificação adicional da encomenda.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              8. Entrega e Prova de Entrega
            </h2>
            <p>
              As encomendas serão entregues no endereço indicado pelo Remetente, mas não necessariamente à pessoa nomeada 
              como Destinatário. Entregas em endereços com recepção centralizada (edifícios comerciais, condomínios, hotéis) 
              podem ser feitas ao pessoal autorizado a receber encomendas.
            </p>
            <p>
              A prova de entrega será fornecida mediante solicitação, na forma de assinatura física ou digital, ou confirmação 
              eletrônica de entrega.
            </p>
            <p>
              Se a entrega não puder ser realizada, a Rastreio Express poderá:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Deixar a encomenda com um vizinho, quando permitido por lei;</li>
              <li>Deixar a encomenda em local seguro, quando autorizado pelo Remetente ou Destinatário;</li>
              <li>Tentar nova entrega em data posterior;</li>
              <li>Depositar a encomenda em ponto de coleta para retirada pelo Destinatário;</li>
              <li>Devolver a encomenda ao Remetente após esgotadas as tentativas de entrega.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              9. Rastreamento de Encomendas
            </h2>
            <p>
              A Rastreio Express fornece um número de rastreamento para cada encomenda, permitindo o acompanhamento do status 
              de transporte e entrega através do website, aplicativo móvel ou central de atendimento.
            </p>
            <p>
              As informações de rastreamento são fornecidas como referência e podem não refletir todos os eventos ou o status 
              exato da encomenda em tempo real. A Rastreio Express não garante a disponibilidade contínua ou precisão absoluta 
              do sistema de rastreamento.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              10. Limitação de Responsabilidade
            </h2>
            <p>
              A responsabilidade da Rastreio Express por perda, dano ou atraso está limitada conforme estabelecido abaixo:
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              10.1. Envios Nacionais
            </h3>
            <p>
              Para envios dentro do Brasil, a responsabilidade da Rastreio Express está limitada ao menor valor entre:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>O valor declarado da encomenda;</li>
              <li>O valor real de mercado do conteúdo;</li>
              <li>R$ 1.000,00 (mil reais) por encomenda.</li>
            </ul>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              10.2. Envios Internacionais
            </h3>
            <p>
              Para envios internacionais, a responsabilidade será determinada de acordo com as convenções internacionais aplicáveis, 
              como a Convenção de Varsóvia ou a Convenção de Montreal, e limitada conforme estabelecido nestas convenções.
            </p>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mt-6 mb-3">
              10.3. Exclusões de Responsabilidade
            </h3>
            <p>
              A Rastreio Express não será responsável por:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Danos indiretos, incidentais ou consequenciais, incluindo perda de receita, lucros, mercados, oportunidades comerciais, etc.;</li>
              <li>Perdas ou danos resultantes de força maior, incluindo desastres naturais, condições climáticas extremas, greves, etc.;</li>
              <li>Perdas ou danos resultantes de embalagem inadequada, atos ou omissões do Remetente, Destinatário ou terceiros;</li>
              <li>Perdas ou danos a artigos proibidos ou perecíveis;</li>
              <li>Atrasos na entrega, independentemente da causa;</li>
              <li>Intervenções de autoridades governamentais, incluindo retenção, confisco ou destruição de encomendas.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              11. Seguro
            </h2>
            <p>
              O Remetente pode contratar seguro adicional para cobertura de valores superiores aos limites de responsabilidade 
              padrão. O seguro deve ser solicitado e pago no momento da contratação do serviço de envio e 
              estará sujeito aos termos e condições da apólice de seguro.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              12. Reclamações
            </h2>
            <p>
              Reclamações relacionadas a perdas ou danos visíveis devem ser registradas no momento da entrega. 
              Para danos não aparentes ou perdas parciais, as reclamações devem ser apresentadas por escrito 
              à Rastreio Express dentro de 7 (sete) dias após a entrega.
            </p>
            <p>
              Em caso de perda total, as reclamações devem ser apresentadas dentro de 30 (trinta) dias após 
              a data estimada para entrega.
            </p>
            <p>
              Todas as reclamações devem ser acompanhadas da documentação de suporte, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Número de rastreamento da encomenda;</li>
              <li>Cópia da guia de remessa ou comprovante de postagem;</li>
              <li>Documentação comprovando o valor do conteúdo (notas fiscais, recibos);</li>
              <li>Fotos da embalagem e do conteúdo danificado, quando aplicável.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              13. Lei Aplicável e Resolução de Disputas
            </h2>
            <p>
              Estes Termos de Envio serão regidos e interpretados de acordo com as leis do Brasil. 
              Qualquer disputa decorrente ou relacionada aos serviços de envio será submetida à 
              jurisdição exclusiva dos tribunais de acordo com a legislação brasileira.
            </p>
            <p>
              As partes concordam em tentar resolver quaisquer disputas de forma amigável antes de 
              iniciar procedimentos judiciais.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              14. Disposições Finais
            </h2>
            <p>
              A Rastreio Express pode modificar estes Termos de Envio a qualquer momento, publicando a versão 
              atualizada em seu website. As modificações entrarão em vigor na data de publicação, 
              salvo disposição em contrário.
            </p>
            <p>
              Se qualquer disposição destes Termos for considerada inválida ou inexequível, 
              as demais disposições permanecerão em pleno vigor e efeito.
            </p>
            <p>
              A falha da Rastreio Express em fazer cumprir qualquer disposição destes Termos 
              não constituirá renúncia a tal disposição ou a qualquer outra.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              15. Entre em Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Envio, entre em contato com nosso departamento de atendimento ao cliente:
            </p>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm mt-4 mb-8">
              <p className="mb-2"><strong>E-mail:</strong> <a href="mailto:atendimento@rastreioexpress.com" className="text-blue-600 dark:text-blue-400 hover:underline">atendimento@rastreioexpress.com</a></p>
              <p><strong>Horário de atendimento:</strong> Segunda a Sexta, das 8h às 18h</p>
            </div>
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

export default TermosEnvioPage; 