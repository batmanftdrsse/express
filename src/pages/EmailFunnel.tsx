import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EmailFunnel = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">
            Configuração do Funil de Email
          </h1>
          <div className="mt-4">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="space-y-4">
                {/* Seção de Configuração do Funil */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Etapas do Funil
                  </h3>
                  <div className="mt-2 space-y-4">
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium">Etapa 1 - Boas-vindas</h4>
                      <p className="text-sm text-gray-500">
                        Email enviado imediatamente após a compra
                      </p>
                    </div>
                    <div className="border rounded-md p-4">
                      <h4 className="font-medium">Etapa 2 - Acompanhamento</h4>
                      <p className="text-sm text-gray-500">
                        Email enviado 48 horas após a compra
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão para adicionar nova etapa */}
                <button
                  type="button"
                  className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Adicionar Nova Etapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFunnel; 