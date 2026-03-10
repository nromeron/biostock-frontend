import api from './api';

export const productService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.inStock !== undefined) params.append('inStock', filters.inStock);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/api/products?${params.toString()}`);
    return response;
  },

  // Get single product by ID
  async getProductById(productId) {
    const response = await api.get(`/api/products/${productId}`);
    return response;
  },

  // Get product categories
  async getCategories() {
    const response = await api.get('/api/products/categories');
    return response;
  },

  // Search products
  async searchProducts(query) {
    const response = await api.get(`/api/products/search?q=${encodeURIComponent(query)}`);
    return response;
  },

  // Get featured/recommended products
  async getFeaturedProducts(limit = 8) {
    const response = await api.get(`/api/products/featured?limit=${limit}`);
    return response;
  }
};
