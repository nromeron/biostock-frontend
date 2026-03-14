import React from 'react';

const statusConfig = {
  PENDING: { color: 'var(--warning-color, #f59e0b)', text: 'Pendiente', bg: '#fef3c7', textCol: '#92400e' },
  CONFIRMED: { color: 'var(--primary-color, #2563eb)', text: 'Confirmado', bg: '#dbeafe', textCol: '#1e40af' },
  PROCESSING: { color: 'var(--secondary-color, #8b5cf6)', text: 'En proceso', bg: '#ede9fe', textCol: '#5b21b6' },
  SHIPPED: { color: '#f97316', text: 'Enviado', bg: '#ffedd5', textCol: '#9a3412' },
  DELIVERED: { color: 'var(--success-color, #10b981)', text: 'Entregado', bg: '#d1fae5', textCol: '#065f46' },
  CANCELLED: { color: 'var(--text-light, #6b7280)', text: 'Cancelado', bg: '#f3f4f6', textCol: '#374151' },
  PAYMENT_FAILED: { color: 'var(--danger-color, #ef4444)', text: 'Pago Fallido', bg: '#fee2e2', textCol: '#991b1b' }
};

const OrderStatusBadge = ({ status, size = 'medium' }) => {
  const config = statusConfig[status] || { color: '#6b7280', text: status, bg: '#f3f4f6', textCol: '#374151' };
  
  const sizeStyles = {
    small: { padding: '2px 8px', fontSize: '0.75rem' },
    medium: { padding: '4px 12px', fontSize: '0.875rem' },
    large: { padding: '6px 16px', fontSize: '1rem' }
  };

  const style = {
    backgroundColor: config.bg,
    color: config.textCol,
    borderRadius: '9999px',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    border: `1px solid ${config.color}33`,
    ...sizeStyles[size]
  };

  return (
    <span style={style} className={`status-badge status-${status.toLowerCase().replace('_', '-')}`}>
      {config.text}
    </span>
  );
};

export default OrderStatusBadge;
