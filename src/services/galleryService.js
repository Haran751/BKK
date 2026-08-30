import api from './api';
export const listGallery = (params) => api.get('/admin/gallery', { params });
export const createGallery = (data) => api.post('/admin/gallery', data);
export const getGallery = (id) => api.get(`/admin/gallery/${id}`);
export const updateGallery = (id, data) => api.put(`/admin/gallery/${id}`, data);
export const deleteGallery = (id) => api.delete(`/admin/gallery/${id}`);
export const listPublicGallery = () => api.get('/gallery');
