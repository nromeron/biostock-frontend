import { authService } from '../services/authService';

export const setupInterceptors = (apiInstance) => {
  apiInstance.interceptors.request.use(
    (config) => {
      const token = authService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Si recibimos 401 Unauthorized
      if (error.response && error.response.status === 401) {
        authService.logout();
        
        // Evitamos redirecciones múltiples
        if (window.location.pathname !== '/login') {
          alert('Sesión expirada. Por favor inicie sesión nuevamente.');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );
};
