import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../Context/ProductContext';

export default function EditProduct() {
  const { id } = useParams();
  const { products, editProduct } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    minimum_quantity: '',
    available_quantity: '',
    owner: '',
  });

  useEffect(() => {
    const product = products.find((prod) => prod.id === parseInt(id));
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        minimum_quantity: product.minimum_quantity,
        available_quantity: product.available_quantity,
        owner: product.owner,
      });
    }
  }, [id, products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editProduct(parseInt(id), formData);
      navigate('/admin/AdminProduct');
    }
  };

  return (
    <div className="container mt-3">
      <h3>تعديل المنتج</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>الاسم:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>السعر:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>اقل كميه للشراء:</label>
          <input
            type="number"
            name="minimum_quantity"
            value={formData.minimum_quantity}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>الكميه المتاحه:</label>
          <input
            type="number"
            name="available_quantity"
            value={formData.available_quantity}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>اسم التاجر:</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">تحديث</button>
      </form>
    </div>
  );
}
