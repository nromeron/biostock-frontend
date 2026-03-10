import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              BioStock Systems
            </h1>
            <p className="hero-subtitle">
              Plataforma de eCommerce especializada en insumos médicos
            </p>
            <p className="hero-description">
              Optimizamos el abastecimiento hospitalario con trazabilidad,
              cumplimiento normativo y automatización de procesos.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-large">
                Ver Catálogo
              </Link>
              {!isAuthenticated && (
                <Link to="/register" className="btn btn-outline btn-large">
                  Crear Cuenta
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Catálogo Especializado</h3>
              <p>
                Amplia variedad de insumos médicos certificados para
                instituciones de salud.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Gestión de Inventarios</h3>
              <p>
                Control en tiempo real de stock y disponibilidad de productos.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Trazabilidad Completa</h3>
              <p>
                Seguimiento detallado de cada pedido desde la orden hasta la
                entrega.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Cumplimiento Normativo</h3>
              <p>
                Todos nuestros productos cumplen con las regulaciones sanitarias
                vigentes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Automatización</h3>
              <p>
                Procesos optimizados para pedidos rápidos y eficientes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Reportes y Analytics</h3>
              <p>
                Información detallada sobre tus compras y patrones de consumo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para optimizar tu abastecimiento?</h2>
            <p>
              Únete a las instituciones de salud que confían en BioStock Systems
            </p>
            <Link to="/register" className="btn btn-primary btn-large">
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
