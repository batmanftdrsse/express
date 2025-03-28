import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

const ConfiguracoesPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data);
      setError(null);
    } catch (err: any) {
      setError('Erro ao carregar usuários: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await api.post('/admin/users', newUser);
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'user',
      });
      fetchUsers();
    } catch (err: any) {
      setError('Erro ao criar usuário: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRole = async (userId: number, currentRole: string) => {
    try {
      setLoading(true);
      const newRole = currentRole === 'master' ? 'user' : 'master';
      await api.patch(`/admin/users/${userId}`, { role: newRole });
      fetchUsers();
    } catch (err: any) {
      setError('Erro ao atualizar usuário: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }
    
    try {
      setLoading(true);
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
    } catch (err: any) {
      setError('Erro ao excluir usuário: ' + (err.message || 'Erro desconhecido'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Gerenciamento de Usuários</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Gerenciamento de Usuários</h2>
        
        <form onSubmit={handleCreateUser} className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nome</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Senha</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Perfil</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="user">Usuário</option>
              <option value="master">Master</option>
            </select>
          </div>
          
          <div className="md:col-span-2 lg:col-span-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Usuário'}
            </button>
          </div>
        </form>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Perfil</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading && users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Carregando...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Nenhum usuário encontrado</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{user.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'master' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                      }`}>
                        {user.role === 'master' ? 'Master' : 'Usuário'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleToggleRole(user.id, user.role)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-xs"
                      >
                        {user.role === 'master' ? 'Tornar Usuário' : 'Tornar Master'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-xs"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage; 