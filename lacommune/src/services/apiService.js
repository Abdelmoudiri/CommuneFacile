import apiClient from '../api';

export const fetchEvents = async () => {
  try {
    const response = await apiClient.get('/events'); 
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};

