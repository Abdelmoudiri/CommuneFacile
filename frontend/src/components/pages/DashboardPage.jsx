import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../common/Navbar';
import api from '../services/api';
import Loading from '../common/Loading';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch user's requests
        const requestsResponse = await api.get('/requests');
        setRequests(requestsResponse.data.data);

        // Fetch upcoming events
        const eventsResponse = await api.get('/events');
        setEvents(eventsResponse.data.data);

        // Fetch notifications
        const notificationsResponse = await api.get('/notifications');
        setNotifications(notificationsResponse.data.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Bonjour, {currentUser?.name} !
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Voici un aperçu de vos activités et des événements à venir.
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erreur
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dashboard grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Requests section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Mes requêtes récentes</h2>
                  <Link
                    to="/requests/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Nouvelle requête
                  </Link>
                </div>
                <div className="mt-6">
                  {requests.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {requests.slice(0, 5).map((request) => (
                        <li key={request.id} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-2 w-2 rounded-full ${
                                request.status === 'resolved' 
                                  ? 'bg-green-500' 
                                  : request.status === 'in_progress' 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                              }`}></div>
                              <div className="ml-4">
                                <h3 className="text-sm font-medium text-gray-900">{request.title}</h3>
                                <p className="text-sm text-gray-500">
                                  Créée le {new Date(request.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Link
                              to={`/requests/${request.id}`}
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Voir
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Vous n'avez pas encore de requêtes.</p>
                      <Link
                        to="/requests/new"
                        className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Créer votre première requête
                      </Link>
                    </div>
                  )}
                </div>
                {requests.length > 5 && (
                  <div className="mt-6">
                    <Link
                      to="/requests"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Voir toutes les requêtes
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Events section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
                  <Link
                    to="/events"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Voir tous
                  </Link>
                </div>
                <div className="mt-6">
                  {events.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {events.slice(0, 3).map((event) => (
                        <li key={event.id} className="py-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{event.location}</span>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">{event.description.substring(0, 100)}...</p>
                            </div>
                            <div className="mt-2">
                              <Link
                                to={`/events/${event.id}`}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Plus de détails
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Aucun événement à venir.</p>
                      <Link
                        to="/events"
                        className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Consulter le calendrier des événements
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications section */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
                <div className="mt-6">
                  {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {notifications.map((notification) => (
                        <li key={notification.id} className="py-4">
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-500">{notification.message}</p>
                              <p className="mt-1 text-xs text-gray-400">
                                {new Date(notification.created_at).toLocaleDateString()} à {new Date(notification.created_at).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">Vous n'avez pas de nouvelles notifications.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Admin or Employee specific section */}
            {(currentUser?.role === 'admin' || currentUser?.role === 'employee') && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {currentUser?.role === 'admin' ? 'Administration' : 'Gestion'}
                  </h2>
                  <div className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {currentUser?.role === 'admin' && (
                        <>
                          <Link
                            to="/admin/users"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Gestion des utilisateurs
                          </Link>
                          <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Tableau de bord admin
                          </Link>
                        </>
                      )}
                      <Link
                        to="/requests/manage"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Gérer les requêtes
                      </Link>
                      <Link
                        to="/events/manage"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Gérer les événements
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;