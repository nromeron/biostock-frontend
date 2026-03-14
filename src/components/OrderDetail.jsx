import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import OrderStatusBadge from './OrderStatusBadge';

const OrderDetail = ({ orderId, isOpen, onClose, onOrderCancelled }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      setLoading(true);
      setError(null);
      orderService.getOrderById(orderId)
        .then(data => {
          setOrder(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Error al cargar el detalle del pedido');
          setLoading(false);
        });
    }
  }, [isOpen, orderId]);

  if (!isOpen) return null;

  const handleCancelOrder = async () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      try {
        await orderService.cancelOrder(orderId);
        alert('Pedido cancelado exitosamente');
        if (onOrderCancelled) onOrderCancelled();
        onClose();
      } catch (err) {
        alert(err.message || 'Error al cancelar el pedido');
      }
    }
  };

  const calculateSubtotal = () => {
    if (!order || !order.items) return 0;
    return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  return (
    <div className="order-detail-overlay" onClick={onClose}>
      <div className="order-detail-modal" onClick={e => e.stopPropagation()}>
        <div className="order-detail-header">
          <h2>
            Detalle de Orden {orderId ? `#${orderId.slice(-8)}` : ''}
            {order && <OrderStatusBadge status={order.status} size="medium" />}
          </h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="order-detail-body">
          {loading && <div className="orders-loading"><div className="spinner"></div><p>Cargando detalles...</p></div>}
          
          {error && (
            <div className="orders-error">
              <p className="text-danger">{error}</p>
              <button className="btn btn-outline" onClick={() => onClose()}>Cerrar</button>
            </div>
          )}

          {!loading && !error && order && (
            <>
              <div className="detail-section">
                <h3>Información General</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Fecha de orden</span>
                    <span className="info-value">{formatDate(order.createdAt || order.orderDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">ID de Usuario</span>
                    <span className="info-value">{order.userId}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Estado de pago</span>
                    <span className="info-value">
                      <OrderStatusBadge 
                        status={order.paymentStatus || 'PENDING'} 
                        size="small" 
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Items de la orden</h3>
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-right">Cantidad</th>
                      <th className="text-right">Precio Unit.</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items && order.items.map((item, index) => (
                      <tr key={item.id || index}>
                        <td>{item.productName || `Producto ${item.productId}`}</td>
                        <td className="text-right">{item.quantity}</td>
                        <td className="text-right">{formatCurrency(item.price)}</td>
                        <td className="text-right">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="detail-section">
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal items:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tarifa de envío:</span>
                    <span>{formatCurrency(order.orderFee || 0)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>{formatCurrency(order.totalAmount || 0)}</span>
                  </div>
                </div>
              </div>

              {(order.createdAt || order.updatedAt) && (
                <div className="detail-section">
                  <h3>Timeline</h3>
                  <div className="info-grid">
                    {order.createdAt && (
                      <div className="info-item">
                        <span className="info-label">Creado</span>
                        <span className="info-value">{formatDate(order.createdAt)}</span>
                      </div>
                    )}
                    {order.updatedAt && (
                      <div className="info-item">
                        <span className="info-label">Última actualización</span>
                        <span className="info-value">{formatDate(order.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="order-detail-footer">
          {!loading && !error && order && order.status === 'PENDING' && (
            <button className="btn btn-outline" style={{ borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={handleCancelOrder}>
              Cancelar Orden
            </button>
          )}
          <button className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
