import api from '../services/api';

export const adminApi = {
  enabled: true,
  login: (email, password) => api.post('/admin/login', { email, password }),
  logout: () => api.post('/admin/logout'),
  me: () => api.get('/admin/me'),
  updateProfile: (payload) => api.put('/admin/me', payload),
  changePassword: (payload) => api.put('/admin/me/password', payload),
  list: (resource, params = {}) => api.get(`/admin/${resource}`, { params }),
  create: (resource, data) => api.post(`/admin/${resource}`, data),
  update: (resource, id, data) => api.put(`/admin/${resource}/${id}`, data),
  remove: (resource, id) => api.delete(`/admin/${resource}/${id}`),
  document: (id, type) => api.get(`/admin/applications/${id}/document/${type}`, { responseType: 'blob' })
};
