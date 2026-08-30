import api from './api';
export const listCompanies = (params) => api.get('/admin/companies', { params });
export const createCompany = (data) => api.post('/admin/companies', data);
export const getCompany = (id) => api.get(`/admin/companies/${id}`);
export const updateCompany = (id, data) => api.put(`/admin/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/admin/companies/${id}`);
export const listPublicCompanies = () => api.get('/companies');
