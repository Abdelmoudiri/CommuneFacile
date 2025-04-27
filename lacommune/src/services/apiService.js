import apiClient from '../api';

// connexion
export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

// l'inscription
export const register = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const registr=async(userdata)=>
{
  try
  {
    const resonse=await apiClient.post('/register',userdata);
    return resonse.data;
  }catch (error){
    console.error("erreur lors de l inscription :",error);
    throw error;
  }
}

//recuperer tous les evenments
export const fetchEvents = async () => {
  try {
    const response = await apiClient.get('/even'); 
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
};


