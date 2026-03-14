import api from './api';

export const orderService = {
  // Create new order
  async createOrder(orderData) {
    try {
      const response = await api.post('/api/orders', orderData);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear la orden');
    }
  },

  // Get user's orders
  async getUserOrders(userId, filters = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filters.status) params.append('status', filters.status);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);

      const qs = params.toString();
      const queryString = qs ? `?${qs}` : '';
      
      const response = await api.get(`/api/orders/user/${userId}${queryString}`);
      // Returning object with orders and pagination if it exists in response.data
      return {
        orders: response.data.data || response.data,
        pagination: response.data.pagination || { page: 1, totalPages: 1 }
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener los pedidos');
    }
  },

  // Get single order by ID
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el detalle de la orden');
    }
  },

  // Cancel order
  async cancelOrder(orderId) {
    try {
      const response = await api.put(`/api/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al cancelar la orden');
    }
  },

  // Get order status history
  async getOrderHistory(orderId) {
    try {
      const response = await api.get(`/api/orders/${orderId}/history`);
      return response.data.data || response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener el historial de la orden');
    }
  }
};
