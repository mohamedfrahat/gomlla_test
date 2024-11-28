import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../Context/ProductContext';

export default function AdminProduct() {
  const { products, handleDelete } = useProducts();

  return (
    <div className="container mt-3">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="product">
              <img src={product.image} alt={product.title} height={300} width={300} />
              <h4>{product.title}</h4>
              <h5>السعر: <span>{product.price}</span></h5>
              <p>اقل كميه للشراء: <span>{product.minimum_quantity}</span></p>
              <p>الكميه المتاحه: <span>{product.available_quantity}</span></p>
              <p>اسم التاجر: {product.owner}</p>
              <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                حذف المنتج 🗑️
              </button>
              <Link to={`/admin/Editproduct/${product.id}`} className="btn btn-primary">
                تعديل المنتج ✏️
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
