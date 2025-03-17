import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../services/dashboardService'

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email: 'test@example.com', password: 'password' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Login Administrativo
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;