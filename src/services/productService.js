import { getProducts, getCategories, getProductById } from '../data/products';

export const productService = {
  // Get all products with optional filters
  async getProducts(filters = {}) {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const products = getProducts(filters);
    
    return {
      products,
      total: products.length
    };
  },

  // Get single product by ID
  async getProductById(productId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const product = getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  },

  // Get product categories
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return getCategories();
  }
};
