import api from './api';
export const listJobs = (params) => api.get('/admin/jobs', { params });
export const createJob = (data) => api.post('/admin/jobs', data);
export const getJob = (id) => api.get(`/admin/jobs/${id}`);
export const updateJob = (id, data) => api.put(`/admin/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/admin/jobs/${id}`);
export const listPublicJobs = (params) => api.get('/jobs', { params });
