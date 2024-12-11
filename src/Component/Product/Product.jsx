import React from 'react';
import './Product.css';
import { useProducts } from '../Context/ProductContext';
import { useCart } from '../Context/CartContext';
import { ToastContainer } from 'react-toastify';

export default function Product() {
  const { products } = useProducts();
  const { addToCart } = useCart();  // Get fetchCart as well


  return (
    <div className="product-container mt-3">
       <ToastContainer />
      <div className="row gy-3">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h4 className="product-name">{product.title}</h4>
              <h5 className="product-price">
                السعر <span>{product.price}</span> جنيه
              </h5>
              <p className="product-info">
                اقل كميه للشراء: <span>{product.minimum_quantity}</span>
              </p>
              <p className="product-info">
                الكميه المتاحه: <span>{product.available_quantity}</span>
              </p>
              <button onClick={() => addToCart(product.id)} className="btn btn-main">اضف للشراء</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
