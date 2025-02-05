import { useAuth } from '../hooks/useAuth';

export const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-dark-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="RastreioExpress" className="h-8 w-auto" />
              <span className="text-white ml-2">RastreioExpress</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a href="/dashboard/email-funnel" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Funil
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={logout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 