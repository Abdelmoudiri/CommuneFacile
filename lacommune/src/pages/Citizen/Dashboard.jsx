import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mes Demandes */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Mes Demandes</h3>
              <p className="mt-1 text-gray-600">Suivre mes demandes en cours</p>
              <Link to="/citizen/requests" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Voir mes demandes →
              </Link>
            </div>
          </div>

          {/* Nouvelle Demande */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Nouvelle Demande</h3>
              <p className="mt-1 text-gray-600">Faire une nouvelle demande de document</p>
              <Link to="/citizen/new-request" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Créer une demande →
              </Link>
            </div>
          </div>

          {/* Mon Profil */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Mon Profil</h3>
              <p className="mt-1 text-gray-600">Gérer mes informations personnelles</p>
              <Link to="/citizen/profile" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Modifier →
              </Link>
            </div>
          </div>

          {/* Événements */}
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Événements</h3>
              <p className="mt-1 text-gray-600">Consulter les événements à venir</p>
              <Link to="/citizen/events" className="mt-4 inline-block text-red-600 hover:text-red-700">
                Voir les événements →
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CitizenDashboard;