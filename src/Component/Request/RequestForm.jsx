// RequestForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './RequestForm.css';

const validationSchema = Yup.object().shape({
  mobile: Yup.string().required('رقم الموبايل مطلوب'),
  address: Yup.string().required('العنوان بالتفصيل مطلوب'),
  location: Yup.string().required('تحديد الموقع مطلوب'),
});

const RequestForm = () => {
  const initialValues = {
    mobile: '',
    address: '',
    location: '',
  };

  const handleSubmit = (values) => {
    console.log('Order Submitted', values);
    // Add your order submission logic here
  };

  return (
      <div className="mt-5">
            <Formik initialValues={initialValues} validationSchema={validationSchema}  onSubmit={handleSubmit}>
      <Form className="request-form">
        <h2>بيانات الطلب</h2>
        <div className="form-group">
          <label>رقم الموبايل</label>
          <Field name="mobile" type="text" placeholder="رقم الموبايل" />
          <ErrorMessage name="mobile" component="div" className="error" />
        </div>
        <div className="form-group">
          <label>العنوان بالتفصيل</label>
          <Field name="address" type="text" placeholder="العنوان بالتفصيل" />
          <ErrorMessage name="address" component="div" className="error" />
        </div>
        <div className="form-group">
          <label>تحديد الموقع</label>
          <Field name="location" type="text" placeholder="لوكيشن" />
          <ErrorMessage name="location" component="div" className="error" />
        </div>
        <button type="submit" className="submit-btn">تنفيذ الطلب</button>
      </Form>
    </Formik>
      </div>
  );
};

export default RequestForm;
