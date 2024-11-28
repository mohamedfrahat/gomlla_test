import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);
  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:5000/products', newProduct, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.status === 201) {
        const createdProduct = response.data.product;
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`);
      if (response.status === 200) {
        // تحديث قائمة المنتجات بعد الحذف
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  

  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        );
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, handleDelete, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
