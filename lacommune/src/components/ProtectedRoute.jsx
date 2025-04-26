import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getUser();
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.role) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role.toLowerCase();
  const allowedRoleLower = allowedRole?.toLowerCase();
  
  if (userRole === 'admin') {
    return children;
  }

  if (allowedRoleLower && userRole !== allowedRoleLower) {
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