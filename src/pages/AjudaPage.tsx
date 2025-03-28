import React, { useState } from 'react';
import { PublicNavbar } from '../components/PublicNavbar';
import { Check, AlertCircle, HelpCircle, Mail, Phone, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const AjudaPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: 'duvida',
    mensagem: '',
    codigoRastreio: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulando envio para API
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Sua solicitação foi enviada com sucesso!');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          assunto: 'duvida',
          mensagem: '',
          codigoRastreio: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Central de Ajuda
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Como podemos ajudar?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível. 
              Tentamos responder todas as solicitações em até 24 horas.
            </p>

            {submitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-300">
                    Solicitação Enviada!
                  </h3>
                </div>
                <p className="text-green-700 dark:text-green-300">
                  Agradecemos pelo seu contato. Um membro da nossa equipe analisará sua solicitação e entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome Completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Assunto <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="assunto"
                      name="assunto"
                      value={formData.assunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="duvida">Dúvida sobre rastreamento</option>
                      <option value="problema">Problema com entrega</option>
                      <option value="feedback">Feedback</option>
                      <option value="empresarial">Planos empresariais</option>
                      <option value="outro">Outro assunto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="codigoRastreio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Código de Rastreio (se aplicável)
                  </label>
                  <input
                    type="text"
                    id="codigoRastreio"
                    name="codigoRastreio"
                    value={formData.codigoRastreio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Digite o código de rastreio relacionado à sua solicitação"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mensagem <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Descreva sua solicitação em detalhes"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <AlertCircle className="inline-block w-4 h-4 mr-1 text-blue-500" />
                    Ao enviar, você concorda com nossa <a href="/privacidade" className="text-blue-600 dark:text-blue-400 hover:underline">Política de Privacidade</a>.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <Mail className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="mailto:atendimento@rastreioexpress.com" className="hover:underline">
                  atendimento@rastreioexpress.com
                </a>
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <Phone className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Atendimento</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Entre em contato pelo formulário acima ou pelos nossos canais oficiais.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Segunda a Sexta, 8h às 18h
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Chat</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Atendimento online disponível pelo nosso chat durante o horário comercial.
              </p>
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

export default AjudaPage; 