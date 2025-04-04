import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../common/Loading';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleGoogleCallback } = useAuth();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');
    
    const processCallback = async () => {
      if (token) {
        const success = await handleGoogleCallback(token);
        if (success) {
          navigate('/dashboard');
        } else {
          navigate('/login', { state: { error: 'Erreur lors de la connexion avec Google' } });
        }
      } else if (error) {
        navigate('/login', { state: { error } });
      } else {
        navigate('/login', { state: { error: 'Paramètres manquants pour l\'authentification Google' } });
      }
    };
    
    processCallback();
  }, [location, navigate, handleGoogleCallback]);
  
  return <Loading />;
};

export default GoogleCallback;