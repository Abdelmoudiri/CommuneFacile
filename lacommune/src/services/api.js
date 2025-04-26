import apiClient from '../api';

// Document Requests
export const getDocumentRequests = () => {
  return apiClient.get('/document-requests');
};

export const getDocumentRequest = (id) => {
  return apiClient.get(`/document-requests/${id}`);
};

export const createDocumentRequest = (data) => {
  return apiClient.post('/document-requests', data);
};

export const processDocumentRequest = (id, data) => {
  return apiClient.post(`/document-requests/${id}/process`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    }
  });
};

export const deleteDocumentRequest = (id) => {
  return apiClient.delete(`/document-requests/${id}`);
};

export const downloadDocumentRequest = (id) => {
  return apiClient.get(`/document-requests/${id}/download`, {
    responseType: 'blob',
    headers: {
      Accept: 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
  });
};