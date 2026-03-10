// Format currency for display
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Format datetime for display
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const isValidPassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /[0-9]/.test(password);
};

// Get order status label in Spanish
export const getOrderStatusLabel = (status) => {
  const statusLabels = {
    'PENDING': 'Pendiente',
    'CONFIRMED': 'Confirmado',
    'PROCESSING': 'En Proceso',
    'SHIPPED': 'Enviado',
    'DELIVERED': 'Entregado',
    'CANCELLED': 'Cancelado',
    'PAYMENT_FAILED': 'Pago Fallido'
  };
  return statusLabels[status] || status;
};

// Get order status color class
export const getOrderStatusColor = (status) => {
  const statusColors = {
    'PENDING': 'warning',
    'CONFIRMED': 'success',
    'PROCESSING': 'primary',
    'SHIPPED': 'primary',
    'DELIVERED': 'success',
    'CANCELLED': 'error',
    'PAYMENT_FAILED': 'error'
  };
  return statusColors[status] || 'default';
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Calculate cart total
export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};
