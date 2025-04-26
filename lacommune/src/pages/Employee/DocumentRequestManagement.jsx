import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getDocumentRequests, processDocumentRequest } from '../../services/api';

const DocumentRequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processingData, setProcessingData] = useState({
    status: '',
    comments: '',
    rejection_reason: '',
    document_file: null
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await getDocumentRequests();
      setRequests(response.data.data);
    } catch (error) {
      setError('Erreur lors du chargement des demandes',error);
    }
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedRequest) return;

    try {
      const formData = new FormData();
      formData.append('status', processingData.status);
      formData.append('comments', processingData.comments || '');

      if (processingData.status === 'rejected') {
        if (!processingData.rejection_reason?.trim()) {
          setError('Le motif du rejet est requis');
          return;
        }
        formData.append('rejection_reason', processingData.rejection_reason);
      }

      if (processingData.status === 'completed') {
        if (!processingData.document_file) {
          setError('Le document est requis pour valider la demande');
          return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (processingData.document_file.size > maxSize) {
          setError('Le fichier ne doit pas dépasser 10MB');
          return;
        }

        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(processingData.document_file.type)) {
          setError('Le fichier doit être au format PDF, DOC ou DOCX');
          return;
        }

        formData.append('document_file', processingData.document_file);
      }

      const response = await processDocumentRequest(selectedRequest.id, formData);
      setSuccess(response.data?.message || 'Demande traitée avec succès');
      setSelectedRequest(null);
      setProcessingData({
        status: '',
        comments: '',
        rejection_reason: '',
        document_file: null
      });
      loadRequests();
    } catch (error) {
      console.error('Error details:', error.response?.data || error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
        setError(errorMessages);
      } else {
        setError('Une erreur est survenue lors du traitement de la demande');
      }
    }
  };

  const getStatusColor = (status) => {
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
        return 'Complété';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestion des Demandes de Documents</h1>

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

          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-8">
            {/* Liste des demandes */}
            <div className="flex-1">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <li
                      key={request.id}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedRequest?.id === request.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-600 truncate">
                              {request.document_type}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Demandé par {request.user?.name || 'Utilisateur inconnu'}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {getStatusText(request.status)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {request.purpose}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Formulaire de traitement */}
            {selectedRequest && (
              <div className="w-96">
                <div className="bg-white shadow sm:rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Traiter la Demande
                  </h2>
                  <form onSubmit={handleProcess} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Statut
                      </label>
                      <select
                        value={processingData.status}
                        onChange={(e) => setProcessingData(prev => ({
                          ...prev,
                          status: e.target.value
                        }))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        required
                      >
                        <option value="">Sélectionnez un statut</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Complété</option>
                        <option value="rejected">Rejeté</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Commentaires
                      </label>
                      <textarea
                        value={processingData.comments}
                        onChange={(e) => setProcessingData(prev => ({
                          ...prev,
                          comments: e.target.value
                        }))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        rows="3"
                      />
                    </div>

                    {processingData.status === 'rejected' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Motif du Rejet
                        </label>
                        <textarea
                          value={processingData.rejection_reason}
                          onChange={(e) => setProcessingData(prev => ({
                            ...prev,
                            rejection_reason: e.target.value
                          }))}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          rows="2"
                          required
                        />
                      </div>
                    )}

                    {processingData.status === 'completed' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Document
                        </label>
                        <input
                          type="file"
                          onChange={(e) => setProcessingData(prev => ({
                            ...prev,
                            document_file: e.target.files[0]
                          }))}
                          className="mt-1 block w-full"
                          accept=".pdf,.doc,.docx"
                        />
                      </div>
                    )}

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(null)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentRequestManagement;