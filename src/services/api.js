import axios from 'axios';
import { setupInterceptors } from '../utils/axiosInterceptor';
// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',  // ← Ruta relativa por defecto
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Setup interceptors
setupInterceptors(api);

export default api;
