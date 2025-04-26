import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import { getDocumentRequests, deleteDocumentRequest, downloadDocumentRequest } from '../../services/api';

const DocumentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(null);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getDocumentRequests();
      // Le backend renvoie directement le tableau de demandes
      setRequests(response.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des demandes',err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      try {
        await deleteDocumentRequest(id);
        setRequests(requests.filter(request => request.id !== id));
        setSuccessMessage('Demande supprimée avec succès');
      } catch (err) {
        setError('Erreur lors de la suppression de la demande',err);
      }
    }
  };

  const handleDownload = async (id, documentType) => {
    try {
      setDownloadLoading(id);
      const response = await downloadDocumentRequest(id);
      
      // Create blob URL from the response data
      const blob = new Blob([response.data], {
        type: response.headers['content-type'] || 'application/octet-stream'
      });
      const url = window.URL.createObjectURL(blob);
      
      // Get filename from content-disposition header or fallback to document type
      const contentDisposition = response.headers['content-disposition'];
      let filename = `${documentType}.pdf`;
      if (contentDisposition) {
        const matches = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (matches && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
      // console.log('Filename:', filename);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      link.remove();
      setDownloadLoading(null);
    } catch (err) {
      console.error('Download error:', err);
      setError('Erreur lors du téléchargement du document');
      setDownloadLoading(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="ml-2">Chargement des demandes...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-gray-900">Mes Demandes de Documents</h1>
              <p className="mt-2 text-sm text-gray-700">
                Liste de toutes vos demandes de documents administratifs
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <Link
                to="/citizen/new-request"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
              >
                Nouvelle Demande
              </Link>
            </div>
          </div>

          {successMessage && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
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

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Type de Document
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date de Demande
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Statut
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Commentaires
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {requests.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-3 py-4 text-sm text-gray-500 text-center">
                            Aucune demande trouvée
                          </td>
                        </tr>
                      ) : (
                        requests.map((request) => (
                          <tr key={request.id}>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                              {request.document_type}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(request.created_at).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(request.status)}`}>
                                {getStatusText(request.status)}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {request.status === 'rejected' ? (
                                <span className="text-red-600">{request.rejection_reason}</span>
                              ) : (
                                request.comments || '-'
                              )}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {request.status === 'completed' && request.document_file && (
                                <button
                                  onClick={() => handleDownload(request.id, request.document_type)}
                                  disabled={downloadLoading === request.id}
                                  className="text-red-600 hover:text-red-900 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {downloadLoading === request.id ? (
                                    <span className="flex items-center">
                                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Téléchargement...
                                    </span>
                                  ) : (
                                    'Télécharger'
                                  )}
                                </button>
                              )}
                              {request.status === 'pending' && (
                                <button
                                  onClick={() => handleDelete(request.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Supprimer
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentRequests;