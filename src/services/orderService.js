import api from './api';

export const orderService = {
  // Create new order
  async createOrder(orderData) {
    const response = await api.post('/api/orders', orderData);
    return response;
  },

  // Get user's orders
  async getUserOrders(userId, filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/api/orders/user/${userId}?${params.toString()}`);
    return response;
  },

  // Get single order by ID
  async getOrderById(orderId) {
    const response = await api.get(`/api/orders/${orderId}`);
    return response;
  },

  // Cancel order
  async cancelOrder(orderId) {
    const response = await api.put(`/api/orders/${orderId}/cancel`);
    return response;
  },

  // Get order status history
  async getOrderHistory(orderId) {
    const response = await api.get(`/api/orders/${orderId}/history`);
    return response;
  }
};
