// AdminLayout.js
import React from 'react';

import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar/AdminNavbar';

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
     
    </div>
  );
}
