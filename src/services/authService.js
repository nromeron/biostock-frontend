import keycloakMock from './keycloakMock';

export const authService = {
  // Login user
  async login(email, password) {
    const result = await keycloakMock.login(email, password);
    return result;
  },

  // Register new user
  async register(userData) {
    const result = await keycloakMock.register(userData);
    return result;
  },

  // Validate existing token
  async validateToken() {
    if (keycloakMock.isAuthenticated()) {
      return keycloakMock.getUserInfo();
    }
    throw new Error('Not authenticated');
  },

  // Logout
  logout() {
    keycloakMock.logout();
  },

  // Get current user
  async getCurrentUser() {
    return keycloakMock.getUserInfo();
  }
};
