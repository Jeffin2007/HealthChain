import axios from 'axios';
import { clearAuthStorage, getStoredToken } from '../utils/authStorage';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

api.interceptors.request.use((cfg) => {
  const token = getStoredToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthStorage();
      window.dispatchEvent(new CustomEvent('hc:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
