import React, { useEffect, useRef } from 'react';
import './RegisterModal.css';
import Register from '../Register/Register';

export default function RegisterModal({ show, handleClose }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`modal ${show ? 'display-block' : 'display-none'}`}>
      <section ref={modalRef} className="m-auto">
        <Register handleClose={handleClose} />
      </section>
    </div>
  );
}
