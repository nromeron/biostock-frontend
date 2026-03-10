import api from './api';

export const authService = {
  // Login user
  async login(email, password) {
    const response = await api.post('/api/auth/login', { email, password });
    return response;
  },

  // Register new user
  async register(userData) {
    const response = await api.post('/api/auth/register', userData);
    return response;
  },

  // Validate existing token
  async validateToken() {
    const response = await api.get('/api/auth/validate');
    return response;
  },

  // Logout (client-side only, token is stateless)
  logout() {
    localStorage.removeItem('token');
  },

  // Get current user profile
  async getCurrentUser() {
    const response = await api.get('/api/users/me');
    return response;
  },

  // Update user profile
  async updateProfile(userId, userData) {
    const response = await api.put(`/api/users/${userId}`, userData);
    return response;
  },

  // Change password
  async changePassword(oldPassword, newPassword) {
    const response = await api.post('/api/auth/change-password', {
      oldPassword,
      newPassword
    });
    return response;
  }
};
