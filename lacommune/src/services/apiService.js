import apiClient from '../api';

// Authentification
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    if (response.data.access_token) {
      const userResponse = await apiClient.get('/me', {
        headers: {
          'Authorization': `Bearer ${response.data.access_token}`
        }
      });
      return {
        ...response.data,
        user: userResponse.data.user
      };
    }
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    handleApiError(error);
  }
};

export const register = async (userData) => {
  try {
    const endpoint = userData.role === 'employee' ? '/admin/register' : '/register';
    const response = await apiClient.post(endpoint, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Utilisateurs
export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    handleApiError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    handleApiError(error);
  }
};

export const toggleUserStatus = async (userId) => {
  try {
    const response = await apiClient.post(`/users/${userId}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification du statut:', error);
    handleApiError(error);
  }
};

// Événements
export const fetchEvents = async () => {
  try {
    const response = await apiClient.get('/evenments');
    if (response.data.status === 'success') {
      return response.data.data;
    }
    throw new Error('Format de réponse invalide');
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    handleApiError(error);
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post('/evenments', eventData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    handleApiError(error);
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/evenments/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    handleApiError(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await apiClient.delete(`/evenments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    handleApiError(error);
  }
};

export const toggleEventPublish = async (id) => {
  try {
    const response = await apiClient.post(`/evenments/${id}/toggle-publish`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors du changement de statut de l\'événement:', error);
    handleApiError(error);
  }
};

// Gestion des erreurs
const handleApiError = (error) => {
  if (error.response?.data?.errors) {
    const errorMessages = Object.entries(error.response.data.errors)
      .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
      .join('\n');
    throw new Error(errorMessages);
  } else if (error.response?.data?.error) {
    throw new Error(error.response.data.error);
  } else if (error.response?.data?.message) {
    throw new Error(error.response.data.message);
  } else if (error.message) {
    throw error;
  } else {
    throw new Error('Une erreur inattendue est survenue');
  }
};


