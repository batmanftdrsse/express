import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 