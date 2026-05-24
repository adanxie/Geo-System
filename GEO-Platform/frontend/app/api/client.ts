import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { email: string; password: string; name?: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getUsers: () => api.get('/users/'),
};

export const campaignAPI = {
  getAll: () => api.get('/campaigns/'),
  getById: (id: string) => api.get(`/campaigns/${id}`),
  create: (data: any) => api.post('/campaigns/', data),
  update: (id: string, data: any) => api.put(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
  start: (id: string) => api.post(`/campaigns/${id}/start`),
  pause: (id: string) => api.post(`/campaigns/${id}/pause`),
};

export const contentAPI = {
  getAll: () => api.get('/contents/'),
  getById: (id: string) => api.get(`/contents/${id}`),
  create: (data: any) => api.post('/contents/', data),
  update: (id: string, data: any) => api.put(`/contents/${id}`, data),
  delete: (id: string) => api.delete(`/contents/${id}`),
  analyze: (id: string) => api.post(`/contents/${id}/analyze`),
  optimize: (id: string) => api.post(`/contents/${id}/optimize`),
};

export const platformAPI = {
  getAll: () => api.get('/platforms/'),
  getById: (id: string) => api.get(`/platforms/${id}`),
  create: (data: any) => api.post('/platforms/', data),
  update: (id: string, data: any) => api.put(`/platforms/${id}`, data),
};

export const rankingAPI = {
  getRecords: (campaignId: string) => api.get(`/rankings/?campaign_id=${campaignId}`),
  getByPlatform: (platformId: string) => api.get(`/rankings/?platform_id=${platformId}`),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getReports: (params?: any) => api.get('/analytics/reports', { params }),
};

export default api;
