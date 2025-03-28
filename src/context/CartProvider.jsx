import React, { createContext, useContext, useState } from "react";

// Create a context for the cart
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
