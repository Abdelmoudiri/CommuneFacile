import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // Redirige vers la page de connexion tout en sauvegardant l'emplacement actuel
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;