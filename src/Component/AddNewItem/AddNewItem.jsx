import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddNewItem.css';
import { useProducts } from '../Context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function AddNewItem() {
  const { addProduct } = useProducts(); // Use addProduct from context
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('اسم المنتج مطلوب'),
    price: Yup.number().required('السعر مطلوب').positive('يجب أن يكون السعر موجب'),
    minimum_quantity: Yup.number()
      .required('الكمية الأقل مطلوبة')
      .min(1, 'الكمية الأقل يجب أن تكون على الأقل 1'),
    available_quantity: Yup.number()
      .required('الكمية المتاحة مطلوبة')
      .min(1, 'الكمية المتاحة يجب أن تكون على الأقل 1'),
    owner: Yup.string().required('اسم المالك مطلوب'),
    image: Yup.string().required('رابط الصورة مطلوب').url('يجب إدخال رابط صورة صحيح'),
  });

  // Submit handler
  const handleSubmit = async (values) => {
    await addProduct(values); // إرسال القيم إلى سياق المنتجات
    navigate('/admin/AdminProduct'); // الانتقال إلى صفحة المنتجات
  };

  return (
    <div className="add-new-item-container">
      <h2>إضافة منتج جديد</h2>
      <Formik
        initialValues={{
          title: '',
          price: '',
          minimum_quantity: '',
          available_quantity: '',
          owner: '',
          image: '', // حقل رابط الصورة
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="add-product-form">
            <div className="form-group">
              <label>اسم المنتج:</label>
              <Field name="title" type="text" placeholder="أدخل اسم المنتج" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>السعر:</label>
              <Field name="price" type="number" placeholder="أدخل سعر المنتج" />
              <ErrorMessage name="price" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>الكمية الأقل:</label>
              <Field name="minimum_quantity" type="number" placeholder="أدخل الكمية الأقل" />
              <ErrorMessage name="minimum_quantity" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>الكمية المتاحة:</label>
              <Field name="available_quantity" type="number" placeholder="أدخل الكمية المتاحة" />
              <ErrorMessage name="available_quantity" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>اسم المالك:</label>
              <Field name="owner" type="text" placeholder="أدخل اسم المالك" />
              <ErrorMessage name="owner" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>رابط الصورة:</label>
              <Field name="image" type="text" placeholder="أدخل رابط الصورة" />
              <ErrorMessage name="image" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn btn-main">إضافة المنتج</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
