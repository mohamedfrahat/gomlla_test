import React, { createContext, useState, useContext } from 'react';

// Create the context
const RequiredProductContext = createContext();

// Custom hook for using the RequiredProductContext
export const useRequiredProduct = () => useContext(RequiredProductContext);

// Provider component
export function RequiredProductProvider({ children }) {
  const [customerRequests, setCustomerRequests] = useState([
    {
      customerName: 'العميل 1',
      customerPhone: '0123456789',
      orderTime: '2024-11-11 10:30',
      orderStatus: 'قيد الانتظار',
      customerAddress: 'شارع 1، المدينة',
      customerLocation: 'الرياض',  // New field for location
      products: [
        {
          id: 1,
          productName: 'منتج 1',
          description: 'هذا هو وصف المنتج 1',
          merchantName: 'تاجر 1',
          quantity: 5,
          totalPrice: 100,
          status: 'قيد الانتظار',
        },
        {
          id: 2,
          productName: 'منتج 2',
          description: 'هذا هو وصف المنتج 2',
          merchantName: 'تاجر 2',
          quantity: 2,
          totalPrice: 50,
          status: 'تمت الموافقة',
        },
      ],
    },
    // Add more sample requests here if needed
  ]);

  const handleStatusChange = (requestIndex, productId, newStatus) => {
    setCustomerRequests((prevRequests) =>
      prevRequests.map((request, idx) => {
        if (idx === requestIndex) {
          return {
            ...request,
            products: request.products.map((product) =>
              product.id === productId ? { ...product, status: newStatus } : product
            ),
          };
        }
        return request;
      })
    );
  };

  const handleOrderStatusChange = (requestIndex, newOrderStatus) => {
    setCustomerRequests((prevRequests) =>
      prevRequests.map((request, idx) =>
        idx === requestIndex ? { ...request, orderStatus: newOrderStatus } : request
      )
    );
  };

  return (
    <RequiredProductContext.Provider
      value={{ customerRequests, handleStatusChange, handleOrderStatusChange }}
    >
      {children}
    </RequiredProductContext.Provider>
  );
}
