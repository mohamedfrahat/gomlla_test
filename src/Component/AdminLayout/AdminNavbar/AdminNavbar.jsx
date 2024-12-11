// AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {

   

   const   logout= ()=> {
        
        
      localStorage.removeItem('currentUserId');
      window.location.reload()
    }

  return (
    <nav className="admin-navbar ">
      <Link to="/admin/AdminProduct">المنتجات</Link>
      <Link to="/admin/RequiredProduct">الطلبات المطلوبه</Link>
      <Link to="/admin/AddNewItem">اضف منتج</Link>
      <Link to="/AddNewItem">الطبات السابقه </Link>
      {/* Add more admin links here */}
      <button onClick={() => logout()}>
        تسجيل الخروج 
      </button>
    </nav>
  );
}
