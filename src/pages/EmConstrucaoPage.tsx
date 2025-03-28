import React from 'react';
import { useLocation } from 'react-router-dom';
import { PublicNavbar } from '../components/PublicNavbar';
import { Construction } from 'lucide-react';

const EmConstrucaoPage = () => {
  const location = useLocation();
  const pageName = location.pathname.substring(1); // Remove a barra inicial
  
  // Função para formatar o nome da página
  const formatPageName = (name: string) => {
    // Substitui hífens por espaços e capitaliza cada palavra
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <Construction className="w-24 h-24 mx-auto text-blue-500 dark:text-blue-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Página em Construção
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A página <span className="font-semibold">{formatPageName(pageName)}</span> está atualmente em desenvolvimento.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8 inline-block mx-auto">
            <p className="text-gray-700 dark:text-gray-300">
              Estamos trabalhando para disponibilizar este conteúdo em breve. Volte mais tarde para conferir as novidades!
            </p>
          </div>
          <a 
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Voltar para a Página Inicial
          </a>
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

export default EmConstrucaoPage; 