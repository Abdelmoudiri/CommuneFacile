import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../utils/auth';

const EmployeeDashboard = () => {
  const [stats, setStats] = useState({
    pendingRequests: 0,
    completedRequests: 0,
    todayRequests: 0,
    totalEvents: 0
  });

  useEffect(() => {
    // TODO: Fetch actual statistics from your API
    // This is placeholder data
    setStats({
      pendingRequests: 12,
      completedRequests: 45,
      todayRequests: 5,
      totalEvents: 8
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-700">Espace Employé</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/employee/profile" className="text-gray-600 hover:text-red-700">
                Mon Profil
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 text-red-700 hover:text-red-800"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Statistiques rapides */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Demandes en attente
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.pendingRequests}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Demandes traitées
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.completedRequests}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Demandes aujourd'hui
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.todayRequests}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Événements actifs
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stats.totalEvents}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions principales */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Demandes de Documents</h3>
              <p className="mt-1 text-gray-600">Gérer les demandes de documents des citoyens</p>
              <Link to="/employee/document-requests" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Gérer les demandes
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Événements</h3>
              <p className="mt-1 text-gray-600">Gérer et suivre les événements de la commune</p>
              <Link to="/employee/events" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Voir les événements
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Mon Planning</h3>
              <p className="mt-1 text-gray-600">Consulter et gérer mon emploi du temps</p>
              <Link to="/employee/schedule" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Voir le planning
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Rapports et Statistiques</h3>
              <p className="mt-1 text-gray-600">Consulter les statistiques et générer des rapports</p>
              <Link to="/employee/statistics" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Voir les statistiques
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              <p className="mt-1 text-gray-600">Voir les notifications et alertes importantes</p>
              <Link to="/employee/notifications" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Voir les notifications
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Support</h3>
              <p className="mt-1 text-gray-600">Accéder à l'aide et au support technique</p>
              <Link to="/employee/support" className="mt-4 inline-flex items-center text-red-600 hover:text-red-700">
                Obtenir de l'aide
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;