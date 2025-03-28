import React, { useState } from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

// Tipo para os itens de FAQ
type FAQItem = {
  question: string;
  answer: string;
};

// Tipo para as categorias de FAQ
type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const FaqPage = () => {
  // Estado para controlar quais itens estão expandidos
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  // Estado para controlar a pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // Lista de categorias e perguntas frequentes
  const faqCategories: FAQCategory[] = [
    {
      title: "Rastreamento de Encomendas",
      items: [
        {
          question: "Como faço para rastrear minha encomenda?",
          answer: "Para rastrear sua encomenda, basta inserir o código de rastreamento fornecido no momento da compra ou envio no campo de busca na página inicial do Rastreio Express. Você também pode acessar o histórico de rastreamento se tiver uma conta cadastrada."
        },
        {
          question: "O que fazer se meu código de rastreamento não funcionar?",
          answer: "Se o código de rastreamento não estiver funcionando, verifique se digitou corretamente. Caso o problema persista, pode ser que a transportadora ainda não tenha registrado a encomenda no sistema. Aguarde algumas horas e tente novamente. Se após 24 horas o problema continuar, entre em contato com a loja onde realizou a compra ou com nossa central de atendimento."
        },
        {
          question: "Quanto tempo após o envio o rastreamento fica disponível?",
          answer: "Normalmente, o código de rastreamento fica disponível no sistema entre 24 e 48 horas após o envio da encomenda. Em períodos de grande volume de entregas, como datas comemorativas, esse prazo pode ser estendido."
        },
        {
          question: "Posso rastrear mais de uma encomenda ao mesmo tempo?",
          answer: "Sim! Com uma conta no Rastreio Express, você pode adicionar múltiplos códigos de rastreamento e acompanhá-los simultaneamente através do painel de controle. Esta função é especialmente útil para quem realiza compras frequentes ou para empresas que precisam monitorar várias remessas."
        }
      ]
    },
    {
      title: "Entregas e Prazos",
      items: [
        {
          question: "Quais são os prazos de entrega padrão?",
          answer: "Os prazos de entrega variam de acordo com a modalidade de envio escolhida e a distância entre o remetente e o destinatário. Entregas locais podem levar de 1 a 2 dias úteis, entregas regionais de 2 a 5 dias úteis, e entregas nacionais de 5 a 10 dias úteis. Para entregas expressas, o prazo pode ser reduzido significativamente."
        },
        {
          question: "O que significa 'Objeto em trânsito'?",
          answer: "O status 'Objeto em trânsito' indica que sua encomenda está se movendo entre centros de distribuição ou em direção ao destino final. Este é um status normal do processo de entrega e indica que tudo está ocorrendo conforme o planejado."
        },
        {
          question: "O que fazer se minha encomenda estiver atrasada?",
          answer: "Se sua encomenda ultrapassou o prazo de entrega estimado, verifique primeiro o status mais recente no sistema de rastreamento. Caso o atraso persista sem atualização por mais de 48 horas, entre em contato com nossa central de atendimento através do formulário na página de Ajuda."
        },
        {
          question: "É possível alterar o endereço de entrega após o envio?",
          answer: "Em alguns casos, é possível solicitar a alteração do endereço de entrega, desde que a encomenda ainda não tenha saído para distribuição final. Entre em contato com nossa central de atendimento o quanto antes para verificar essa possibilidade. Taxas adicionais podem ser aplicadas."
        }
      ]
    },
    {
      title: "Notificações e Alertas",
      items: [
        {
          question: "Como receber notificações sobre o status da minha encomenda?",
          answer: "Ao rastrear sua encomenda em nosso site, você pode optar por receber notificações por e-mail ou SMS sobre atualizações de status. Basta inserir seu endereço de e-mail ou número de telefone no campo correspondente. Usuários cadastrados podem configurar suas preferências de notificação no painel de controle."
        },
        {
          question: "Por que não estou recebendo notificações?",
          answer: "Verifique se o e-mail informado está correto e se as mensagens não estão sendo direcionadas para a pasta de spam. Para notificações via SMS, confirme se o número de telefone foi inserido corretamente com o DDD. Se o problema persistir, verifique suas configurações de notificação no painel de controle ou entre em contato com o suporte."
        },
        {
          question: "Posso personalizar os tipos de notificações que recebo?",
          answer: "Sim, usuários cadastrados podem personalizar quais tipos de atualizações desejam receber. No painel de controle, acesse a seção 'Configurações de Notificação' e selecione as opções desejadas, como notificações para saída para entrega, tentativas de entrega, entrega realizada, entre outras."
        }
      ]
    },
    {
      title: "Problemas e Soluções",
      items: [
        {
          question: "O que fazer se minha encomenda foi entregue a outra pessoa?",
          answer: "Se o sistema indica que sua encomenda foi entregue, mas você não a recebeu, entre em contato imediatamente com nossa central de atendimento. Teremos acesso aos dados da entrega, como horário e pessoa que recebeu, e poderemos iniciar uma investigação. É importante agir rapidamente nestes casos."
        },
        {
          question: "Como proceder em caso de encomenda danificada?",
          answer: "Caso receba uma encomenda danificada, não recuse o recebimento. Aceite a entrega, mas registre no comprovante de entrega que o item foi recebido com danos. Tire fotos da embalagem e do produto danificado e entre em contato com nossa central de atendimento em até 7 dias para abrir um processo de indenização."
        },
        {
          question: "O que significa o status 'Objeto devolvido ao remetente'?",
          answer: "Este status indica que, após tentativas malsucedidas de entrega ou por solicitação do remetente, a encomenda está sendo devolvida à origem. Isso pode ocorrer por diversos motivos, como endereço incorreto, ausência do destinatário após várias tentativas, recusa no recebimento, entre outros."
        },
        {
          question: "Minha encomenda está retida na fiscalização. O que devo fazer?",
          answer: "Quando uma encomenda é retida na fiscalização (geralmente pela Receita Federal ou órgãos reguladores), é necessário aguardar o processo de verificação. Em alguns casos, pode ser solicitada documentação adicional ou o pagamento de taxas. Acompanhe o status pelo rastreamento e siga as instruções fornecidas pela autoridade fiscalizadora."
        }
      ]
    },
    {
      title: "Conta e Privacidade",
      items: [
        {
          question: "Como criar uma conta no Rastreio Express?",
          answer: "Para criar uma conta, clique no botão 'Cadastre-se' no canto superior direito da página inicial. Preencha o formulário com seus dados pessoais, escolha uma senha segura e confirme seu e-mail através do link que enviaremos. Com uma conta, você terá acesso a recursos exclusivos como histórico de rastreamentos e notificações personalizadas."
        },
        {
          question: "Quais são as vantagens de ter uma conta?",
          answer: "Com uma conta no Rastreio Express, você pode salvar e acompanhar múltiplos códigos de rastreamento, receber notificações personalizadas, acessar histórico de envios anteriores, gerar relatórios de entrega e utilizar recursos avançados como integração com e-commerce e API para empresas."
        },
        {
          question: "Como o Rastreio Express protege meus dados pessoais?",
          answer: "Levamos sua privacidade muito a sério. Todos os dados são criptografados e armazenados em servidores seguros. Utilizamos as mais modernas práticas de segurança digital e estamos em conformidade com a LGPD (Lei Geral de Proteção de Dados). Para mais informações, consulte nossa Política de Privacidade."
        },
        {
          question: "Posso excluir minha conta e todos os meus dados?",
          answer: "Sim, você tem o direito de solicitar a exclusão de sua conta e todos os dados associados a ela. Para isso, acesse sua conta, vá até 'Configurações de Conta' e selecione a opção 'Excluir Conta'. Alternativamente, você pode entrar em contato com nosso suporte para solicitar a exclusão manual."
        }
      ]
    }
  ];

  // Função para alternar o estado de expansão de um item
  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filtra as categorias e itens baseados no termo de pesquisa
  const filteredCategories = searchTerm 
    ? faqCategories.map(category => ({
        ...category,
        items: category.items.filter(item => 
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.items.length > 0)
    : faqCategories;

  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Perguntas Frequentes
          </h1>
          
          <div className="mb-10">
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-8">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços de rastreamento e entrega.
              Caso não encontre o que procura, entre em contato com nossa equipe de suporte.
            </p>
            
            {/* Barra de pesquisa */}
            <div className="relative max-w-lg mx-auto mb-12">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar por palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Exibe mensagem se não houver resultados */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                Nenhum resultado encontrado para "{searchTerm}".
              </p>
              <button 
                className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                onClick={() => setSearchTerm('')}
              >
                Limpar pesquisa
              </button>
            </div>
          )}
          
          {/* Acordeão de perguntas frequentes */}
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <h2 className="text-xl font-semibold p-5 bg-blue-50 dark:bg-blue-900/20 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  {category.title}
                </h2>
                
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => {
                    const isExpanded = expandedItems[`${categoryIndex}-${itemIndex}`];
                    
                    return (
                      <div key={itemIndex} className="p-5">
                        <button
                          className="flex justify-between items-center w-full text-left"
                          onClick={() => toggleItem(categoryIndex, itemIndex)}
                        >
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-8">
                            {item.question}
                          </h3>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-4 text-gray-600 dark:text-gray-400 prose dark:prose-dark max-w-none">
                            <p>{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Seção de suporte adicional */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Nossa equipe de suporte está pronta para ajudar com qualquer questão específica sobre seu rastreamento ou entrega.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/ajuda" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Acessar Central de Ajuda
              </a>
              <a 
                href="/contato" 
                className="px-6 py-3 bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                Fale Conosco
              </a>
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

export default FaqPage; 