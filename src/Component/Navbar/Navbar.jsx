import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Images/gomla-logo.PNG';
import './Navbar.css';
import RegisterModal from '../RegisterModal/RegisterModal';
import { useCart } from '../Context/CartContext';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // State for cart item count

  const { cartItems ,fetchCart } = useCart();  // Get fetchCart as well

useEffect(() => {
    setCartCount(cartItems.length);
     fetchCart();
},[cartItems.length]
)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
``
  
    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    return (
        <div className='header'>
            <nav className='container'>
                <h1 className="logo"><Link to="/"> جمله</Link></h1>
                <div className="hamburger" onClick={toggleMenu}>
                    <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
                <div className={`hearder-containt ${isMenuOpen ? 'active' : ''}`}>
                    <Link to={'/Cart'}>
                        <div className='cart position-relative'>
                            <i className="fa-solid fa-shopping-cart me-2 "></i> عربه التسوق
                           <span className="cart-counter">{cartCount}</span>
                        </div>
                    </Link>
                    <div className="roadblock">|</div>
                    
                    <Link to={'/Orders'}>
                        <div className="orders">
                            <span style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-history me-1"></i>طلباتي
                            </span>
                        </div>
                    </Link>
                    <div className="roadblock">|</div>
                    {/* <div className="Login me-lg-3" onClick={openRegisterModal} style={{ cursor: 'pointer' }}>
                        <span>
                            <i className="fa-solid fa-user me-1"></i>تسجيل الدخول
                        </span>
                    </div> */}
                      <Link to={'/'}>
                        
                            <div style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-house">المنتجات</i>
                            </div>
                        
                    </Link>
                </div>
            </nav>

            <RegisterModal show={isRegisterModalOpen} handleClose={closeRegisterModal} />
        </div>
    );
}
