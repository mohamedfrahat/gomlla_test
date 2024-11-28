import React from 'react';
import './Orders.css';

export default function Orders() {
  // بيانات تجريبية لغرض العرض
  const orders = [
    {
      id: '001',
      date: '2023-11-01',
      items: ['منتج أ', 'منتج ب'],
      total: '100.00',
    },
    {
      id: '002',
      date: '2023-11-05',
      items: ['منتج ج', 'منتج د'],
      total: '150.00',
    },
  ];

  return (
    <div className="orders-container">
      <h1 className="orders-title">طلباتي</h1>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h2>طلب رقم {order.id}</h2>
                <span className="order-date">{order.date}</span>
              </div>
              <div className="order-items">
                <p><strong>المنتجات:</strong></p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="order-total">
                <p><strong>الإجمالي:</strong> ${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders">ليس لديك طلبات سابقة.</p>
      )}
    </div>
  );
}
