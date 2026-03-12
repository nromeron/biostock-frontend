// Mock de Keycloak para desarrollo
class KeycloakMock {
  constructor() {
    this.authenticated = false;
    this.token = null;
    this.userInfo = null;
  }

  async init() {
    // Check if there's a stored token
    const storedToken = localStorage.getItem('kc_token');
    const storedUser = localStorage.getItem('kc_user');
    
    if (storedToken && storedUser) {
      this.authenticated = true;
      this.token = storedToken;
      this.userInfo = JSON.parse(storedUser);
    }
    
    return this.authenticated;
  }

  async login(email, password) {
    // Simular llamada a Keycloak
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock de validación (acepta cualquier email/password)
    if (email && password) {
      this.authenticated = true;
      this.token = `mock_token_${Date.now()}`;
      this.userInfo = {
        sub: '3b87d93f-80aa-4ba7-a7f7-7e4e9314cb6e',
        email: email,
        name: email.split('@')[0],
        preferred_username: email,
        email_verified: true
      };
      
      // Guardar en localStorage
      localStorage.setItem('kc_token', this.token);
      localStorage.setItem('kc_user', JSON.stringify(this.userInfo));
      
      return {
        success: true,
        token: this.token,
        user: this.userInfo
      };
    }
    
    throw new Error('Invalid credentials');
  }

  async register(userData) {
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Auto-login después del registro
    return this.login(userData.email, 'mock_password');
  }

  logout() {
    this.authenticated = false;
    this.token = null;
    this.userInfo = null;
    localStorage.removeItem('kc_token');
    localStorage.removeItem('kc_user');
  }

  getToken() {
    return this.token;
  }

  getUserInfo() {
    return this.userInfo;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new KeycloakMock();
