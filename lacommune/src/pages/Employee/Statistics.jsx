import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getDocumentRequests } from '../../services/api';

const Statistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await getDocumentRequests();
      const requests = response.data.data;
      
      const statistics = requests.reduce((acc, request) => {
        acc.total++;
        switch(request.status) {
          case 'pending':
            acc.pending++;
            break;
          case 'in_progress':
            acc.inProgress++;
            break;
          case 'completed':
            acc.completed++;
            break;
          case 'rejected':
            acc.rejected++;
            break;
          default:
            break;
        }
        return acc;
      }, {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        rejected: 0
      });

      setStats(statistics);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Statistiques des Demandes</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total des demandes */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <p className="mt-1 text-gray-600">Total des demandes</p>
              </div>
            </div>

            {/* Demandes en attente */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <p className="mt-1 text-gray-600">En attente</p>
              </div>
            </div>

            {/* Demandes en cours */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                <p className="mt-1 text-gray-600">En cours</p>
              </div>
            </div>

            {/* Demandes complétées */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="p-6">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <p className="mt-1 text-gray-600">Complétées</p>
              </div>
            </div>
          </div>

          {/* Graphique des statistiques */}
          <div className="mt-8 bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Répartition des demandes</h2>
              <div className="h-64 flex items-end space-x-4">
                <div className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-yellow-200 hover:bg-yellow-300 transition-all"
                    style={{height: `${(stats.pending / stats.total) * 100}%`}}
                  ></div>
                  <div className="text-sm text-center mt-2">En attente</div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-blue-200 hover:bg-blue-300 transition-all"
                    style={{height: `${(stats.inProgress / stats.total) * 100}%`}}
                  ></div>
                  <div className="text-sm text-center mt-2">En cours</div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-green-200 hover:bg-green-300 transition-all"
                    style={{height: `${(stats.completed / stats.total) * 100}%`}}
                  ></div>
                  <div className="text-sm text-center mt-2">Complétées</div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <div 
                    className="bg-red-200 hover:bg-red-300 transition-all"
                    style={{height: `${(stats.rejected / stats.total) * 100}%`}}
                  ></div>
                  <div className="text-sm text-center mt-2">Rejetées</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;