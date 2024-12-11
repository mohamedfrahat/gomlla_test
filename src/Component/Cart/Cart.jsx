import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext'; // Ensure correct path
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Cart.css';

export default function Cart() {
  const { cartItems, loading, fetchCart, deletefromcart, updateCartQuantity } = useCart();
  const serviceAndDeliveryFee = 100; // Flat fee for service and delivery

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + serviceAndDeliveryFee;
  };

  const handleQuantityChange = async (product_id, currentQuantity, change, availableQuantity, minimumQuantity) => {
    const newQuantity = currentQuantity + change;

    // Check if the new quantity is within the allowed range
    if (newQuantity >= minimumQuantity && newQuantity <= availableQuantity) {
      if (newQuantity > 0) {
        // Update quantity via API call
        await updateCartQuantity(product_id, newQuantity);
        fetchCart(); // Refresh the cart after updating
      } else {
        // Optional: Remove the item if quantity becomes 0
        deletefromcart(product_id);
      }
    }
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <h2>عربة التسوق</h2>
      <ToastContainer />
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.product_id}>
              <img src={item.image} alt={item.title} className="cart-item-image ms-2" />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <h5>الكميه المتاحه: {item.available_quantity}</h5>
                <h5>اقل كميه :{item.minimum_quantity}</h5>
                <p>السعر: {item.price} جنيه</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.product_id, item.quantity, -1, item.available_quantity, item.minimum_quantity)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.product_id, item.quantity, 1, item.available_quantity, item.minimum_quantity)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item-total">
                <p>الإجمالي: {item.price * item.quantity} جنيه</p>
                <button
                  onClick={() => {
                    deletefromcart(item.product_id);
                  }}
                  className="remove-btn"
                >
                  إزالة المنتج
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>إجمالي المبلغ: {calculateSubtotal()} جنيه</h3>
            <h3>رسوم الخدمة والتوصيل: {serviceAndDeliveryFee} جنيه</h3>
            <h3>الإجمالي النهائي: {calculateTotal()} جنيه</h3>
            <Link to={'/RequestForm'}>
              <button className="checkout-btn">تنفيذ الطلب</button>
            </Link>
          </div>
        </div>
      ) : (
        <p>عربة التسوق فارغة</p>
      )}
    </div>
  );
}
