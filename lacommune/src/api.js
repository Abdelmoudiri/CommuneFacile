import axios from 'axios';
import { API_URL } from './services/config';
import { getToken } from './utils/auth';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true
});

apiClient.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Ajout des en-têtes appropriés pour multipart/form-data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('La requête a pris trop de temps. Veuillez réessayer.'));
    }

    if (!error.response) {
      return Promise.reject(new Error('Erreur de connexion au serveur.'));
    }

    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expirée. Veuillez vous reconnecter.'));
    }

    return Promise.reject(error);
  }
);

export default apiClient;