import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { getUser, isAuthenticated as checkAuth } from '../utils/auth';

const Header = () => {
  const user = getUser();
  const isAuthenticated = checkAuth();

  // Fonction pour obtenir le lien du dashboard en fonction du rôle
  const getDashboardLink = () => {
    if (!user || !user.role) {
      return '/';
    }
    
    const role = user.role.toLowerCase();
    switch (role) {
      case 'admin':
        return '/admin';
      case 'employee':
        return '/employee';
      case 'citizen':
        return '/citizen';
      default:
        return '/';
    }
  };

  return (
    <header className="w-full bg-white py-4 shadow-md">
      <div className="w-full px-6">
        <div className="max-w-[2000px] mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-red-600 font-medium">
              Accueil
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-red-600 font-medium">
              À propos
            </Link>
            <Link to="/services" className="text-gray-800 hover:text-red-600 font-medium">
              Services
            </Link>
            <Link to="/evenements" className="text-gray-800 hover:text-red-600 font-medium">
              Événements
            </Link>
            <Link to="/testimonials" className="text-gray-800 hover:text-red-600 font-medium">
              Témoignages
            </Link>
            {isAuthenticated && user && user.role && (
              <Link to={getDashboardLink()} className="text-gray-800 hover:text-red-600 font-medium">
                Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition">
                  S'inscrire
                </Link>
                <Link to="/login" className="border border-red-700 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition">
                  Se connecter
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                }}
                className="border border-red-700 text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Se déconnecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;