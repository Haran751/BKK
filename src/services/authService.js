import api from './api';
export const login = (credentials) => api.post('/admin/login', credentials);
export const me = () => api.get('/admin/me');
export const logout = () => api.post('/admin/logout');
