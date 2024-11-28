import React from 'react'
import Navbar from '../Navbar/Navbar'
import Product from '../Product/Product'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <div>
      <Navbar/>
      
    <Outlet></Outlet>
    <div className="mt-5">
    <Footer/>
    </div>
    </div>
  )
}
