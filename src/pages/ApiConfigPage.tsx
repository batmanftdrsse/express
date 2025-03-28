import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { adsPayService } from '../services/adsPayService';

interface ApiConfig {
  apiKey: string;
  maskedApiKey?: string;
  lastUpdatedAt?: string;
  lastUpdatedBy?: {
    id: number;
    name: string;
    email: string;
  } | null;
}

const ApiConfigPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [configInfo, setConfigInfo] = useState<ApiConfig | null>(null);

  useEffect(() => {
    // Carregar a configuração atual do backend
    fetchApiConfig();
  }, []);

  const fetchApiConfig = async () => {
    try {
      setLoading(true);
      
      const response = await api.get('/admin/api-config');
      const data = response.data;
      
      setConfigInfo(data);
      setApiKey(data.apiKey || '');
      
      setError(null);
    } catch (err: any) {
      setError('Erro ao carregar configuração da API: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setApiKey(value);
  };

  const handleUpdateApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Validar a chave (formato básico)
      if (!apiKey.startsWith('sk_')) {
        throw new Error('A chave de API deve começar com "sk_"');
      }
      
      // Enviar a nova chave para o backend
      const response = await api.post('/admin/api-config', { apiKey });
      
      if (response.data.success) {
        setSuccess('Chave de API atualizada com sucesso!');
        // Atualizar as informações da configuração
        await fetchApiConfig();
      } else {
        throw new Error('Falha ao atualizar a chave de API');
      }
    } catch (err: any) {
      setError('Erro ao atualizar chave de API: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestApiKey = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Testar a chave usando o serviço
      await adsPayService.testApiKey(apiKey);
      
      setSuccess('Teste realizado com sucesso! A chave de API é válida.');
    } catch (err: any) {
      setError('Erro ao testar chave de API: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Configuração de API</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-400 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Chave de API AdsPay</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Configure sua chave de API utilizada para gerar pagamentos PIX. Substitua a chave abaixo para utilizar uma nova conta.
        </p>
        
        {configInfo && configInfo.lastUpdatedBy && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              <strong>Última atualização:</strong> {new Date(configInfo.lastUpdatedAt || '').toLocaleString()} por {configInfo.lastUpdatedBy.name} ({configInfo.lastUpdatedBy.email})
            </p>
          </div>
        )}
        
        <form onSubmit={handleUpdateApiKey} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Chave de API</label>
            <input
              type="text"
              value={apiKey}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
              required
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              A chave começa com "sk_" e é usada para autenticar todas as requisições de pagamento.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? 'Atualizando...' : 'Atualizar Chave'}
            </button>
            
            <button
              type="button"
              onClick={handleTestApiKey}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
              disabled={loading}
            >
              {loading ? 'Testando...' : 'Testar Conexão'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Informações Adicionais</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Para obter uma nova chave de API, acesse o painel da AdsPay e gere uma chave secreta para o seu negócio.
            A chave é necessária para processar pagamentos PIX na plataforma.
          </p>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded border border-yellow-200 dark:border-yellow-800">
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              <strong>Importante:</strong> Nunca compartilhe sua chave de API. Ela concede acesso para processar pagamentos em nome da sua conta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiConfigPage;
