import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Don't forget to import the styles


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user ID from localStorage
  const currentUserId = localStorage.getItem('currentUserId');


  // Fetch cart items for the user
  const fetchCart = async () => {
    try {
      // Use POST instead of GET for sending body
      const response = await axios.post('http://localhost:5000/cart/getCartAndProducts', {
        user_id: currentUserId, // Body contains user_id

      });


        setCartItems(response.data.cart);

    } catch (error) {
      console.error('Error fetching cart:', error.message);
    } finally {
      setLoading(false);
    }
  };
  // Add item to cart
  const addToCart = async (product_id) => {
    try {
      const response = await axios.post('http://localhost:5000/cart/addtocart', {
        user_id: currentUserId,
        product_id,
      });
      fetchCart();
      // Assuming the response contains a message
      const message = response.data.message;

      // Display the toast message
      toast.success(message); // You can use `toast.error()` for error messages

    } catch (error) {
      console.error('Error adding to cart:', error.message);
      toast.error('There was an error adding the item to the cart.');
    }
  };
  // delete the item from cart
  const deletefromcart = async (product_id) => {
    

    try {
      // إرسال البيانات عبر `data` في `axios.delete`
      const response = await axios.delete('http://localhost:5000/cart/deletefromcart', {
        data: { // إرسال البيانات هنا في `data`
          user_id: currentUserId,
          product_id,
        }
      });
      fetchCart();
 

    } catch (error) {
      console.error('Error deleting from cart:', error.message);
      toast.error('There was an error deleting the item from the cart.'); // عرض رسالة الخطأ باستخدام `toast.error`
    }
  };

const updateCartQuantity = async (product_id, old_quantity ) => {
  try {
    const response = await axios.put('http://localhost:5000/cart/updateCartQuantity', {
      user_id: currentUserId,
      product_id,
      new_quantity:old_quantity
    });
    
  } catch (error) {
    console.error('Error updating cart quantity:', error.message);
  }
}
  return (
    <CartContext.Provider value={{ fetchCart, cartItems, addToCart, loading, deletefromcart,updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
