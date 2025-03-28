import axios from 'axios'

// Cria uma instância com a URL base correta para a API
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Para depuração
console.log('API baseURL configurada para:', api.defaults.baseURL)

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  console.log('Requisição para:', config.url, config.baseURL, config.data)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratar erros
api.interceptors.response.use(
  response => {
    console.log('Resposta recebida:', response.status, response.data)
    return response
  },
  error => {
    console.error('Erro na requisição:', error.response?.status, error.response?.data)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api 