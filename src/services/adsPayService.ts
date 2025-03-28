import axios from 'axios';
import api from './api';

// Valor padrão da chave de API caso não seja possível obter do servidor
const DEFAULT_API_KEY = 'sk_';

// Em ambiente de desenvolvimento, usamos o proxy configurado no Vite
// Em produção, usaríamos a URL direta
const API_URL = '/adspay/v1';

interface PixResponse {
  id: string;
  qrcode: string;
  pix: {
    qrcode: string;
    expirationDate: string;
  };
  status: string;
  amount: number;
}

// Armazenar a chave em memória para evitar requisições desnecessárias
let cachedApiKey: string = DEFAULT_API_KEY;
let apiKeyLastFetchTime: number = 0;
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutos

// Função para obter a chave de API atual do backend
const getApiKey = async (): Promise<string> => {
  const now = Date.now();
  
  // Se temos uma chave em cache e ela não expirou, usar a mesma
  if (apiKeyLastFetchTime > 0 && now - apiKeyLastFetchTime < CACHE_EXPIRY_MS) {
    return cachedApiKey;
  }
  
  try {
    // Buscar a chave da API do backend
    const response = await api.get('/admin/api-config');
    if (response.data && response.data.apiKey) {
      cachedApiKey = response.data.apiKey;
      apiKeyLastFetchTime = now;
      return cachedApiKey;
    }
    return DEFAULT_API_KEY;
  } catch (error) {
    console.error('Erro ao buscar chave de API do servidor:', error);
    // Se a chave em cache foi definida anteriormente, usá-la como fallback
    if (apiKeyLastFetchTime > 0) {
      return cachedApiKey;
    }
    return DEFAULT_API_KEY;
  }
};

export const adsPayService = {
  // Método para testar a validade da chave de API
  async testApiKey(apiKey: string): Promise<boolean> {
    try {
      // Em um cenário real, faríamos uma requisição simples para validar a chave
      // Por enquanto, apenas simular o sucesso se a chave começar com sk_
      if (!apiKey.startsWith('sk_')) {
        throw new Error('Formato de chave inválido');
      }
      
      // Poderia ser uma chamada real para verificar a chave
      // await axios.get(`${API_URL}/validate-key`, {
      //   headers: {
      //     'authorization': `Basic ${btoa(apiKey + ':x')}`
      //   }
      // });
      
      return true;
    } catch (error) {
      console.error('Erro ao testar chave de API:', error);
      throw error;
    }
  },
  
  async generatePix(trackingCode: string): Promise<PixResponse> {
    try {
      console.log(`Gerando PIX para o código de rastreamento: ${trackingCode}`);
      
      // Obter a chave atual para usar na requisição
      const apiKey = await getApiKey();
      
      // Montar os dados da requisição no formato exato conforme os exemplos
      const requestData = {
        paymentMethod: 'pix',
        customer: {
          document: {
            type: 'cpf', 
            number: '00000000000'
          },
          name: 'Cliente',
          email: 'cliente@example.com'
        },
        // Os valores são em centavos (6895 = R$ 68,95)
        amount: 6895,
        pix: {
          expiresInDays: 1
        },
        items: [
          {
            title: `Payment`,
            unitPrice: 6895,
            quantity: 1,
            tangible: false
          }
        ],
        installments: '1'
      };
      
      console.log("Enviando dados para API:", JSON.stringify(requestData, null, 2));
      console.log("Usando chave de API:", apiKey.substring(0, 10) + '...');
      
      // Usando autenticação Basic conforme o exemplo
      const response = await axios.post(
        `${API_URL}/transactions`,
        requestData,
        {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization': `Basic ${btoa(apiKey + ':x')}`
          }
        }
      );

      console.log('Resposta da API de PIX:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Detalhes da resposta de erro:', JSON.stringify(error.response.data, null, 2));
      }
      throw new Error('Falha ao gerar o PIX. Por favor, tente novamente.');
    }
  }
}; 