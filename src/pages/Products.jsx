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
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Catálogo de Productos</h1>
          <p>Insumos médicos de alta calidad para instituciones de salud</p>
        </div>

        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filters.search}
              onChange={handleSearchChange}
              className="form-input"
            />
          </div>

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
          {products.length === 0 ? (
            <div className="no-products">
              <p>No se encontraron productos</p>
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
