import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App Component
const AppContent = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          
          {/* Protected routes - require authentication */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div className="container">
                  <h1>Mis Pedidos</h1>
                  <p>Página en construcción...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="container">
                  <h1>Mi Perfil</h1>
                  <p>Página en construcción...</p>
                </div>
              </ProtectedRoute>
            }
          />
          
          {/* 404 - Not Found */}
          <Route
            path="*"
            element={
              <div className="container text-center" style={{ padding: '60px 20px' }}>
                <h1>404 - Página no encontrada</h1>
                <p>La página que buscas no existe.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 BioStock Systems. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

// Root App with Providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
