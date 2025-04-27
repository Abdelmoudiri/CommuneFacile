import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role.toLowerCase();
  
  if (userRole === 'admin') {
    return children;
  }

  const allowedRoleLower = allowedRole ? allowedRole.toLowerCase() : null;
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