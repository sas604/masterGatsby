import React, { useState, createContext } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // we need to stick state here
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
