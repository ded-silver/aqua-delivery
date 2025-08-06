import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/v1',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_key');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
