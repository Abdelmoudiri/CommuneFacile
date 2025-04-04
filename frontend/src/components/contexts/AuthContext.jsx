import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (AuthService.isLoggedIn()) {
          const userData = AuthService.getUser();
          setCurrentUser(userData);
          
          // Optional: Verify and update user data from the server
          try {
            const freshUserData = await AuthService.getCurrentUser();
            setCurrentUser(freshUserData);
          } catch (error) {
            console.error('Error fetching fresh user data:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials);
      setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setCurrentUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await AuthService.updateProfile(userData);
      setCurrentUser(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = () => {
    AuthService.redirectToGoogleAuth();
  };

  const handleGoogleCallback = async (token) => {
    if (token) {
      localStorage.setItem('token', token);
      try {
        const userData = await AuthService.getCurrentUser();
        setCurrentUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } catch (error) {
        console.error('Error fetching user data after Google login:', error);
        return false;
      }
    }
    return false;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    loginWithGoogle,
    handleGoogleCallback,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;