import api from './api';
export const listApplications = (params) => api.get('/admin/applications', { params });
export const getApplication = (id) => api.get(`/admin/applications/${id}`);
export const updateApplication = (id, data) => api.put(`/admin/applications/${id}`, data);
export const deleteApplication = (id) => api.delete(`/admin/applications/${id}`);
export const applicationDocumentUrl = (id, type) => `${api.defaults.baseURL}/admin/applications/${id}/document/${type}`;
export const submitApplication = (formData) => api.post('/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const trackApplication = (params) => api.get('/applications/track', { params });
