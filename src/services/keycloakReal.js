import Keycloak from 'keycloak-js';
import { KEYCLOAK_CONFIG } from '../config/keycloak';

class KeycloakRealService {
  constructor() {
    this.keycloakInstance = null;
    this.initialized = false;
  }

  async init() {
    if (!this.keycloakInstance) {
      this.keycloakInstance = new Keycloak(KEYCLOAK_CONFIG.keycloak);
    }
    
    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false,
        pkceMethod: 'S256'
      });
      
      this.initialized = true;
      return authenticated;
    } catch (error) {
      console.error('Failed to initialize adapter:', error);
      return false;
    }
  }

  login(options = {}) {
    if (!this.keycloakInstance) return Promise.reject(new Error('Keycloak not initialized'));
    return this.keycloakInstance.login(options);
  }

  register(options = {}) {
    if (!this.keycloakInstance) return Promise.reject(new Error('Keycloak not initialized'));
    return this.keycloakInstance.register(options);
  }

  logout(options = {}) {
    if (!this.keycloakInstance) return Promise.reject(new Error('Keycloak not initialized'));
    return this.keycloakInstance.logout({
      redirectUri: window.location.origin,
      ...options
    });
  }

  getToken() {
    if (!this.keycloakInstance) return null;
    
    // Si el token expira en menos de 70 segundos, actualízalo
    if (this.keycloakInstance.isTokenExpired(70)) {
       this.updateToken(70).catch(console.error);
    }
    
    return this.keycloakInstance.token;
  }

  async getUserInfo() {
    if (!this.keycloakInstance) return null;
    
    try {
      if (!this.keycloakInstance.profile) {
        await this.keycloakInstance.loadUserProfile();
      }
      
      const { profile, tokenParsed } = this.keycloakInstance;
      
      return {
        sub: tokenParsed?.sub,
        email: profile?.email,
        name: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || profile?.username,
        preferred_username: profile?.username,
        email_verified: profile?.emailVerified
      };
    } catch (error) {
      console.error('Failed to load user profile', error);
      return null;
    }
  }

  isAuthenticated() {
    return this.keycloakInstance ? this.keycloakInstance.authenticated : false;
  }

  async updateToken(minValidity = 70) {
    if (!this.keycloakInstance) return false;
    try {
      return await this.keycloakInstance.updateToken(minValidity);
    } catch (error) {
      console.error('Failed to refresh token', error);
      // Optional: force logout if token fails to refresh
      // await this.logout();
      return false;
    }
  }
}

export const keycloakReal = new KeycloakRealService();
