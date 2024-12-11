import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, role }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب currentUserId من localStorage0p
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      setCurrentUserId(Number(savedUserId)); 
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

 
  if (role === 'admin' && currentUserId !== 863000000) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
