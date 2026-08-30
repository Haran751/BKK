import api from './api';
export const listArticles = (params) => api.get('/admin/articles', { params });
export const createArticle = (data) => api.post('/admin/articles', data);
export const getArticle = (id) => api.get(`/admin/articles/${id}`);
export const updateArticle = (id, data) => api.put(`/admin/articles/${id}`, data);
export const deleteArticle = (id) => api.delete(`/admin/articles/${id}`);
export const listPublicArticles = () => api.get('/articles');
