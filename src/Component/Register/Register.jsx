import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminMobile = '01143365045';
    const adminPassword = '123456';

    if (mobile === adminMobile && password === adminPassword) {
      localStorage.setItem('currentUserId', '863000000');
      navigate('/admin'); 
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="register">
      <div className="form-container">
        <div className="form-header">
          <h2 className="h1">جملة</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="number"
            placeholder="رقم الموبايل"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="password"
            placeholder="الباسورد"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin}>
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
