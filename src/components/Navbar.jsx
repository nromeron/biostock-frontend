import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">⚕️</span>
          <span className="brand-text">BioStock Systems</span>
        </Link>

        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Inicio</Link></li>
          <li><Link to="/products" className="navbar-link">Productos</Link></li>
          {isAuthenticated && (
            <>
              <li><Link to="/orders" className="navbar-link">Mis Pedidos</Link></li>
              <li><Link to="/profile" className="navbar-link">Perfil</Link></li>
            </>
          )}
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">Hola, {user?.name || user?.email}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Iniciar Sesión</Link>
              <Link to="/register" className="btn btn-primary">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
