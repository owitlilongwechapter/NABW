import axios from 'axios';

// Use the same-origin Next.js proxy by default. This prevents deployed browsers
// from trying to reach `localhost:5000` on the visitor's own device.
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ error: 'Network error. Please check your connection.' });
    } else {
      return Promise.reject({ error: error.message });
    }
  }
);

// API methods for each content type
export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getFeatured: () => api.get('/projects/featured'),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const eventsAPI = {
  getAll: () => api.get('/events'),
  getUpcoming: () => api.get('/events/upcoming'),
  getPast: () => api.get('/events/past'),
  getBySlug: (slug) => api.get(`/events/${slug}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

export const membershipsAPI = {
  create: (data) => api.post('/memberships', data),
  getAll: () => api.get('/memberships'),
  getById: (id) => api.get(`/memberships/${id}`),
  update: (id, data) => api.put(`/memberships/${id}`, data),
  delete: (id) => api.delete(`/memberships/${id}`),
};

export const contactsAPI = {
  submit: (data) => api.post('/contacts', data),
  getAll: () => api.get('/contacts'),
  getById: (id) => api.get(`/contacts/${id}`),
  update: (id, data) => api.put(`/contacts/${id}`, data),
  delete: (id) => api.delete(`/contacts/${id}`),
};

export const faqsAPI = {
  getAll: () => api.get('/faqs'),
  getById: (id) => api.get(`/faqs/${id}`),
  create: (data) => api.post('/faqs', data),
  update: (id, data) => api.put(`/faqs/${id}`, data),
  delete: (id) => api.delete(`/faqs/${id}`),
};

export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
  getById: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

export const partnersAPI = {
  getAll: () => api.get('/partners'),
  getById: (id) => api.get(`/partners/${id}`),
  create: (data) => api.post('/partners', data),
  update: (id, data) => api.put(`/partners/${id}`, data),
  delete: (id) => api.delete(`/partners/${id}`),
};

export const impactStatsAPI = {
  getAll: () => api.get('/impact-stats'),
  getById: (id) => api.get(`/impact-stats/${id}`),
  create: (data) => api.post('/impact-stats', data),
  update: (id, data) => api.put(`/impact-stats/${id}`, data),
  delete: (id) => api.delete(`/impact-stats/${id}`),
};

export const newsAPI = {
  getAll: () => api.get('/news'),
  getFeatured: () => api.get('/news/featured'),
  getBySlug: (slug) => api.get(`/news/${slug}`),
  create: (data) => api.post('/news', data),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};

export const strategicPlanAPI = {
  get: () => api.get('/strategic-plan'),
  create: (data) => api.post('/strategic-plan', data),
  update: (id, data) => api.put(`/strategic-plan/${id}`, data),
  delete: (id) => api.delete(`/strategic-plan/${id}`),
};

export const aboutAPI = {
  get: () => api.get('/about'),
  create: (data) => api.post('/about', data),
  update: (id, data) => api.put(`/about/${id}`, data),
  delete: (id) => api.delete(`/about/${id}`),
};

export const healthCheck = () => api.get('/health');

export default api;
