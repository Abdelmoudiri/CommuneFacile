import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding the auth token
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

// Response interceptor for handling token expiration
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Try to refresh the token
      return api.post('/refresh')
        .then(res => {
          if (res.status === 200) {
            // Save the new token
            localStorage.setItem('token', res.data.data.token);
            
            // Update the authorization header
            originalRequest.headers['Authorization'] = `Bearer ${res.data.data.token}`;
            
            // Return the request with new token
            return api(originalRequest);
          }
        })
        .catch(refreshError => {
          // If refresh token fails, log out the user
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