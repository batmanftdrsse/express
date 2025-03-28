import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isMaster: () => boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Recupera dados da sessão ao iniciar
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log('Tentando login com:', { email, password }) // Debug

      // Importante: a rota de login não tem prefixo /api
      const response = await api.post('/auth/login', { 
        email, 
        password 
      }, {
        // Adicione headers específicos se necessário
        headers: {
          'Content-Type': 'application/json'
        },
        baseURL: 'http://localhost:3001' // Usar a URL base sem o prefixo /api
      })

      console.log('Resposta do login:', response.data) // Debug

      const { token: newToken, user: userData } = response.data

      // Guardar os dados primeiro
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Depois atualizar o estado
      setToken(newToken)
      setUser(userData)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      // Aumentar o delay para garantir que tudo seja salvo antes do redirecionamento
      // e evitar problemas de atualização da página
      return new Promise<void>(resolve => {
        setTimeout(() => {
          navigate('/dashboard', { replace: true })
          resolve()
        }, 500)
      })
    } catch (error: any) {
      console.error('Erro detalhado no login:', {
        error,
        response: error.response?.data,
        status: error.response?.status
      })
      throw error
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    navigate('/login')
  }

  const isMaster = () => {
    return !!user && user.role === 'master'
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token,
      isMaster
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 