import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { getDocumentRequests, processDocumentRequest } from '../../services/api';

const DocumentRequestsManagement = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [processForm, setProcessForm] = useState({
    status: '',
    comments: '',
    rejection_reason: '',
    document_file: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getDocumentRequests();
      setRequests(response.data || []);
    } catch (error) {
      setError('Erreur lors du chargement des demandes',error);
    }
  };

  const handleProcessSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!selectedRequest) return;

    try {
      const formData = new FormData();
      formData.append('status', processForm.status);
      formData.append('comments', processForm.comments || '');

      if (processForm.status === 'rejected') {
        if (!processForm.rejection_reason?.trim()) {
          throw new Error('Le motif du rejet est requis');
        }
        formData.append('rejection_reason', processForm.rejection_reason);
      }

      if (processForm.status === 'completed') {
        if (!processForm.document_file) {
          throw new Error('Le document est requis pour valider la demande');
        }

        // Vérifier le type MIME du fichier
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(processForm.document_file.type)) {
          throw new Error('Le fichier doit être au format PDF ou DOC/DOCX');
        }

        // Vérifier la taille du fichier (10MB max)
        const maxSize = 10 * 1024 * 1024;
        if (processForm.document_file.size > maxSize) {
          throw new Error('Le fichier ne doit pas dépasser 10MB');
        }

        formData.append('document_file', processForm.document_file);
      }

      const response = await processDocumentRequest(selectedRequest.id, formData);
      setSuccess(response.data?.message || 'Demande traitée avec succès');
      setSelectedRequest(null);
      setProcessForm({
        status: '',
        comments: '',
        rejection_reason: '',
        document_file: null
      });
      fetchRequests();

    } catch (error) {
      console.error('Error processing request:', error);
      if (error.response?.data?.errors) {
        // Afficher les erreurs de validation du backend
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join('\n');
        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || error.message || 'Erreur lors du traitement de la demande');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProcessForm(prev => ({
        ...prev,
        document_file: file
      }));
    }
  };

  const handleProcessFormChange = (e) => {
    const { name, value } = e.target;
    setProcessForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusBadgeClass = (status) => {
    const baseClass = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'in_progress':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'completed':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return baseClass;
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

          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {requests.map((request) => (
                    <li
                      key={request.id}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedRequest?.id === request.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <p className="text-sm font-medium text-red-600 truncate">
                              {request.document_type}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="truncate">Demandeur: {request.user?.name}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={getStatusBadgeClass(request.status)}>
                              {getStatusText(request.status)}
                            </span>
                            <p className="mt-2 text-sm text-gray-500">
                              {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  {requests.length === 0 && (
                    <li>
                      <div className="px-4 py-8 text-center text-gray-500">
                        Aucune demande de document trouvée
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {selectedRequest && (
              <div className="w-96">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Traiter la Demande
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Type: {selectedRequest.document_type}</p>
                      <p className="mt-1">Motif: {selectedRequest.purpose}</p>
                    </div>
                    <form onSubmit={handleProcessSubmit} className="mt-5 space-y-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Statut
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={processForm.status}
                          onChange={handleProcessFormChange}
                          required
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Sélectionnez un statut</option>
                          <option value="in_progress">En cours</option>
                          <option value="completed">Terminé</option>
                          <option value="rejected">Rejeté</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                          Commentaires
                        </label>
                        <textarea
                          id="comments"
                          name="comments"
                          rows="3"
                          value={processForm.comments}
                          onChange={handleProcessFormChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        />
                      </div>

                      {processForm.status === 'rejected' && (
                        <div>
                          <label htmlFor="rejection_reason" className="block text-sm font-medium text-gray-700">
                            Motif du Rejet
                          </label>
                          <textarea
                            id="rejection_reason"
                            name="rejection_reason"
                            rows="3"
                            value={processForm.rejection_reason}
                            onChange={handleProcessFormChange}
                            required
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      )}

                      {processForm.status === 'completed' && (
                        <div>
                          <label htmlFor="document_file" className="block text-sm font-medium text-gray-700">
                            Document PDF
                          </label>
                          <input
                            type="file"
                            id="document_file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            required
                            className="mt-1 block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-semibold
                              file:bg-red-50 file:text-red-700
                              hover:file:bg-red-100"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Formats acceptés: PDF, DOC, DOCX (max 2MB)
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end space-x-3 mt-5">
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(null)}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                          {loading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Traitement...
                            </span>
                          ) : (
                            'Enregistrer'
                          )}
                        </button>
                      </div>
                    </form>
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

export default DocumentRequestsManagement;