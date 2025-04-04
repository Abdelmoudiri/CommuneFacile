import api from './api';
// import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

const AuthService = {
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error connecting to server' };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error connecting to server' };
    }
  },

  async logout() {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove items even if the API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/user');
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error fetching user data' };
    }
  },

  async updateProfile(userData) {
    try {
      const response = await api.put('/profile', userData);
      // Update the stored user data
      if (response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error updating profile' };
    }
  },

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired
      if (decoded.exp < currentTime) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  // Method for Google Authentication redirect
  async redirectToGoogleAuth() {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  }
};

export default AuthService;