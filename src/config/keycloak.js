import keycloakMock from '../services/keycloakMock';
import { keycloakReal } from '../services/keycloakReal';

export const KEYCLOAK_CONFIG = {
  provider: import.meta.env.VITE_AUTH_PROVIDER || 'mock',
  
  keycloak: {
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080/auth',
    realm: import.meta.env.VITE_KEYCLOAK_REALM || 'biostock',
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'biostock-frontend'
  }
};

export const getAuthProvider = () => {
  return KEYCLOAK_CONFIG.provider === 'keycloak' ? keycloakReal : keycloakMock;
};
