import api from './axios';

export const getWorkflows = () => api.get('/workflows');
export const getWorkflowById = (id: string) => api.get(`/workflows/${id}`);
export const searchWorkflows = (query: string) => api.get(`/workflows/search?q=${query}`);
export const uploadWorkflow = (formData: FormData) => api.post('/workflows', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const downloadWorkflow = (id: string) => api.get(`/workflows/download/${id}`, {
  responseType: 'blob',
});
