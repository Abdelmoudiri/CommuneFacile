import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getUser();
  const token = localStorage.getItem('token');

  // Si pas de token ou pas d'utilisateur, rediriger vers login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier que user.role existe avant d'appeler toLowerCase()
  if (!user.role) {
    console.error('Role utilisateur non défini');
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role.toLowerCase();
  const allowedRoleLower = allowedRole?.toLowerCase();
  
  // Les admins ont accès à tout
  if (userRole === 'admin') {
    return children;
  }

  // Si un rôle spécifique est requis, vérifier la correspondance
  if (allowedRoleLower && userRole !== allowedRoleLower) {
    // Rediriger vers le dashboard approprié selon le rôle
    switch (userRole) {
      case 'employee':
        return <Navigate to="/employee" replace />;
      case 'citizen':
        return <Navigate to="/citizen" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;