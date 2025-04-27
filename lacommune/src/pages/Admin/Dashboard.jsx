import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/auth';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-red-700">Admin Dashboard</h1>
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-600 hover:text-red-700">
                  Accueil
                </Link>
                <Link to="/services" className="text-gray-600 hover:text-red-700">
                  Services
                </Link>
                <Link to="/evenements" className="text-gray-600 hover:text-red-700">
                  Événements
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-red-700">
                  À propos
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                onClick={logout}
                className="ml-4 px-4 py-2 text-red-700 hover:text-red-800"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Gestion des Employés */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Employés</h3>
              <p className="mt-1 text-gray-600">Gérer les comptes employés</p>
              <Link to="/admin/employees" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Gérer →
              </Link>
            </div>
          </div>

          {/* Gestion des Utilisateurs */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Utilisateurs</h3>
              <p className="mt-1 text-gray-600">Gérer les comptes utilisateurs</p>
              <Link to="/admin/users" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Gérer →
              </Link>
            </div>
          </div>

          {/* Gestion des Événements */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Événements</h3>
              <p className="mt-1 text-gray-600">Gérer les événements</p>
              <Link to="/admin/events" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Gérer →
              </Link>
            </div>
          </div>

          {/* Gestion des Services */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Services</h3>
              <p className="mt-1 text-gray-600">Gérer les services municipaux</p>
              <Link to="/admin/services" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Gérer →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;