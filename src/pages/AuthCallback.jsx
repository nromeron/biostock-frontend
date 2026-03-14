import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuth();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const isAuthenticated = await authService.init();
        
        if (isAuthenticated) {
          const user = await authService.getCurrentUser();
          const token = authService.getToken();
          
          if (token) {
            localStorage.setItem('token', token);
          }
          
          if (user) {
             updateUser(user);
          }
          
          const returnTo = location.state?.from || '/';
          navigate(returnTo, { replace: true });
        } else {
          // If not authenticated, send to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/login', { replace: true });
      }
    };

    processCallback();
  }, [navigate, location, updateUser]);

  return (
    <div className="loading-screen" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner" style={{ marginBottom: '1rem' }}></div>
      <p>Completando autenticación...</p>
    </div>
  );
};

export default AuthCallback;
