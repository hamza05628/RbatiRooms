import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Your backend base URL
  withCredentials: true  // Include cookies (if you're using sessions)
});

// Add a request interceptor to include JWT token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Set Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
