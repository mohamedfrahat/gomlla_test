import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './Component/Context/ProductContext';
import { RequiredProductProvider } from './Component/Context/RequiredProductContext';
import { UserProvider } from './Component/Context/UserContext';
import { CartProvider } from './Component/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
 <UserProvider>
  <RequiredProductProvider>
 <ProductProvider>
      <App />
  </ProductProvider>
  </RequiredProductProvider>
 </UserProvider>
  
</CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
