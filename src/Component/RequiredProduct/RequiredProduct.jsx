import React, { useState } from 'react';
import './RequiredProduct.css';
import { useRequiredProduct } from '../Context/RequiredProductContext';

export default function RequiredProduct() {
  const { customerRequests, handleStatusChange, handleOrderStatusChange } = useRequiredProduct();
  const [openRequest, setOpenRequest] = useState(null);

  const toggleRequest = (index) => {
    setOpenRequest(openRequest === index ? null : index);
  };

  // Function to determine the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'تمت الموافقة':
        return '#4CAF50'; // Green for approved
      case 'تم الرفض':
        return '#f44336'; // Red for rejected
      case 'قيد التحضير':
        return '#ff9800'; // Orange for preparing
      case 'قيد الانتظار':
        return '#ff6600'; // Orange for pending
      default:
        return '#999'; // Default gray for unknown status
    }
  };

  return (
    <div className="required-product-container">
      <h3>طلبات المنتجات من المستخدمين</h3>
      {customerRequests.map((request, index) => {
        const totalAmount = request.products.reduce((sum, product) => sum + product.totalPrice, 0);

        return (
          <div key={index} className="customer-request">
            <button className="accordion" onClick={() => toggleRequest(index)}>
              طلب من: {request.customerName} - رقم موبايل العميل: {request.customerPhone}
            </button>
            {openRequest === index && (
              <div>
                <div><strong>وقت الطلب:</strong> {request.orderTime}</div>
                <div><strong>عنوان العميل:</strong> {request.customerAddress}</div>
                <div><strong>الموقع:</strong> {request.customerLocation}</div>

                <div className="order-status">
                  <strong>حالة الطلب:</strong>
                  <select
                    value={request.orderStatus}
                    onChange={(e) => handleOrderStatusChange(index, e.target.value)}
                    style={{ backgroundColor: getStatusColor(request.orderStatus), color: '#fff' }}
                  >
                    <option value="قيد الانتظار">قيد الانتظار</option>
                    <option value="قيد التحضير">قيد التحضير</option>
                    <option value="تم الرفض">تم الرفض</option>
                    <option value="تمت الموافقة">تم التحضير</option>
                  </select>
                </div>

                <ul className="product-requests-list">
                  {request.products.map((product) => (
                    <li key={product.id} className="request-item">
                      <div><strong>اسم المنتج:</strong> {product.productName}</div>
                      <div><strong>وصف المنتج:</strong> {product.description}</div>
                      <div><strong>اسم التاجر:</strong> {product.merchantName}</div>
                      <div><strong>الكمية المطلوبة:</strong> {product.quantity}</div>
                      <div><strong>السعر الإجمالي:</strong> {product.totalPrice} جنيه</div>
                      <div className="Admin-order-statues">
                        <strong>الحالة:</strong>
                        <select
                          value={product.status}
                          onChange={(e) => handleStatusChange(index, product.id, e.target.value)}
                          style={{ backgroundColor: getStatusColor(product.status), color: '#fff' }}
                        >
                          <option value="قيد الانتظار">قيد الانتظار</option>
                          <option value="قيد التحضير">قيد التحضير</option>
                          <option value="تم الرفض">تم الرفض</option>
                          <option value="تمت الموافقة">تم التحضير</option>
                        </select>
                        <div 
                          className="status-display"
                          style={{ backgroundColor: getStatusColor(product.status) }}
                        >
                        
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="total-amount">
                  إجمالي الطلب: {totalAmount} جنيه
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
