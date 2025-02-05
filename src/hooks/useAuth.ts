import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  lastActivity: number;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateActivity: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lastActivity: Date.now(),
      
      login: async (credentials) => {
        // Implementar lógica de login aqui
        set({ isAuthenticated: true, lastActivity: Date.now() });
      },
      
      logout: () => {
        set({ isAuthenticated: false, lastActivity: 0 });
      },
      
      updateActivity: () => {
        set({ lastActivity: Date.now() });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
); 