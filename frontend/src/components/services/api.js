import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json '
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      return api.post('/refresh')
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.data.token);
            originalRequest.headers['Authorization'] = `Bearer ${res.data.data.token}`;
            
            return api(originalRequest);
          }
        })
        .catch(refreshError => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location = '/login';
          return Promise.reject(refreshError);
        });
    }
    
    return Promise.reject(error);
  }
);

export default api;