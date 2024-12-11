import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getcurrentuser = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/user');
      console.log('API Response:', data);
      localStorage.setItem('currentUserId', data.currentid);
      setCurrentUserId(data.currentid);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      const savedId = localStorage.getItem('currentUserId');
      if (savedId) {
        setCurrentUserId(parseInt(savedId, 10)); // Use the saved ID
      } else {
        await getcurrentuser(); // Fetch the ID from the API
      }
      setLoading(false); // Finish loading
    };
    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUserId, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
