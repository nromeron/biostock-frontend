import { getAuthProvider, KEYCLOAK_CONFIG } from '../config/keycloak';

const authProvider = getAuthProvider();

export const authService = {
  async init() {
    if (KEYCLOAK_CONFIG.provider === 'keycloak') {
      return await authProvider.init();
    }
    // Mock initializes instantly
    return authProvider.isAuthenticated();
  },

  // Login user
  async login(email, password) {
    if (KEYCLOAK_CONFIG.provider === 'keycloak') {
      return authProvider.login(); // redirects to keycloak
    }
    return await authProvider.login(email, password);
  },

  // Register new user
  async register(userData) {
    if (KEYCLOAK_CONFIG.provider === 'keycloak') {
      return authProvider.register(); // redirects to keycloak
    }
    return await authProvider.register(userData);
  },

  // Validate existing token
  async validateToken() {
    if (authProvider.isAuthenticated()) {
      return await authProvider.getUserInfo();
    }
    throw new Error('Not authenticated');
  },

  // Logout
  logout() {
    return authProvider.logout();
  },

  // Get current user
  async getCurrentUser() {
    return await authProvider.getUserInfo();
  },
  
  getToken() {
    return authProvider.getToken();
  }
};
