import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderDetail from '../components/OrderDetail';
import './Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getUserOrders(user.id || user.sub, {
        status: filterStatus,
        page: currentPage,
        limit: 10
      });
      
      setOrders(data.orders || []);
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los pedidos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filterStatus, currentPage]);

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleViewDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = () => {
    fetchOrders(); // Refresh table
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatCurrency = (amount) => {
    return `$${Number(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1 className="orders-title">Mis Pedidos</h1>
        <div className="orders-filter">
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="">Todos los estados</option>
            <option value="PENDING">Pendientes</option>
            <option value="CONFIRMED">Confirmados</option>
            <option value="PROCESSING">En proceso</option>
            <option value="SHIPPED">Enviados</option>
            <option value="DELIVERED">Entregados</option>
            <option value="CANCELLED">Cancelados</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="orders-loading">
          <div className="spinner"></div>
          <p>Cargando pedidos...</p>
        </div>
      )}

      {error && !loading && (
        <div className="orders-empty text-danger">
          <p>⚠️ {error}</p>
          <button className="btn btn-primary" onClick={fetchOrders} style={{ marginTop: '1rem' }}>
            Reintentar
          </button>
        </div>
      )}

      {orders.length === 0 && !loading && !error && (
        <div className="orders-empty">
          <h3>No tienes pedidos</h3>
          <p>Todavía no has realizado ninguna compra en nuestra plataforma. 🛒</p>
        </div>
      )}

      {orders.length > 0 && !loading && !error && (
        <>
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <span className="order-card-number">#{order.id.slice(-8)}</span>
                  <span className="order-card-date">{formatDate(order.createdAt || order.orderDate)}</span>
                </div>
                
                <OrderStatusBadge status={order.status} size="small" />
                
                <div className="order-card-body">
                  <div className="order-card-total">
                    {formatCurrency(order.totalAmount || 0)}
                  </div>
                  <div className="order-card-items">
                    {order.items?.length || 0} {(order.items?.length === 1) ? 'producto' : 'productos'}
                  </div>
                </div>
                
                <div className="order-card-footer">
                  <button 
                    className="btn btn-outline btn-view-detail"
                    onClick={() => handleViewDetail(order.id)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="orders-pagination">
              <button 
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button 
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      <OrderDetail 
        orderId={selectedOrderId} 
        isOpen={showDetail} 
        onClose={handleCloseDetail}
        onOrderCancelled={handleCancelOrder}
      />
    </div>
  );
};

export default Orders;
