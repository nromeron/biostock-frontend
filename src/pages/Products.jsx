import React, { useState, useEffect } from 'react';
import { getCategories } from '../data/products';
import { productService } from '../services/productService';
import { formatCurrency } from '../utils/helpers';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: true
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(filters);
      setProducts(data.products || data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Catálogo de Productos</h1>
          <p>Insumos médicos de alta calidad para instituciones de salud</p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <div className="filters-section">
          <form className="search-box" onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-input"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Buscar
            </button>
          </form>

          <div className="filter-group">
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className="form-input"
            >
              <option value="">Todas las categorías</option>
              {/* Las categorías vienen de los productos quemados */}
              <option value="Protección Personal">Protección Personal</option>
              <option value="Equipos de Diagnóstico">Equipos de Diagnóstico</option>
              <option value="Material Consumible">Material Consumible</option>
              <option value="Desinfección">Desinfección</option>
              <option value="Equipamiento">Equipamiento</option>
              <option value="Instrumental Quirúrgico">Instrumental Quirúrgico</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="spinner-container" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', padding: '3rem' }}>
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
              <p>No se encontraron productos coherentes con la búsqueda.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">
                      <span>🏥</span>
                    </div>
                  )}
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="badge badge-warning">Pocas unidades</span>
                  )}
                  {product.stock === 0 && (
                    <span className="badge badge-error">Agotado</span>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <span className="product-stock">
                      Stock: {product.stock} unidades
                    </span>
                  </div>

                  <div className="product-footer">
                    <div className="product-price">
                      {formatCurrency(product.price)}
                    </div>
                    <button
                      className="btn btn-primary"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Agotado' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
