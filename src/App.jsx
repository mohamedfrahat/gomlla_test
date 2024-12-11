import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import AdminLayout from './Component/AdminLayout/AdminLayout';
import Home from './Component/Home/Home';
import Cart from './Component/Cart/Cart';
import Register from './Component/Register/Register';
import Orders from './Component/Orders/Orders';
import RequestForm from './Component/Request/RequestForm';
import AddNewItem from './Component/AddNewItem/AddNewItem';
import AdminProduct from './Component/AdminProduct/AdminProduct';
import RequiredProduct from './Component/RequiredProduct/RequiredProduct';
import EditProduct from './Component/AdminProduct/EditProduct';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'Register', element: <Register /> },
        { path: 'Orders', element: <Orders /> },
        { path: 'Cart', element: <Cart /> },
        { path: 'RequestForm', element: <RequestForm /> },
      ],
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute element={<AdminLayout />} role="admin" />
      ),
      children: [
        { path: 'AddNewItem', element: <AddNewItem /> },
        { path: 'AdminProduct', element: <AdminProduct /> },
        { path: 'RequiredProduct', element: <RequiredProduct /> },
        { path: 'EditProduct/:id', element: <EditProduct /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  
}
