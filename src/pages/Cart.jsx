import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [customerId, setCustomerId] = useState("");

  // Backend API Base URL (Cart Service on port 8094)
  const API_BASE_URL = "http://localhost:8094/api/cart";

  // Fetch Cart Items
  const fetchCart = useCallback(async () => {
    if (!customerId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/${customerId}`);
      if (typeof response.data === "string") {
        alert("Cart not found");
        setCart(null);
      } else {
        setCart(response.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [customerId]);

  // Add Cart (Create a new cart)
  const addCart = async () => {
    if (!customerId) {
      alert("Please enter a Customer ID.");
      return;
    }
    try {
      const newCart = { id: customerId, items: [] };
      const response = await axios.post(API_BASE_URL, newCart);
      setCart(response.data);
    } catch (error) {
      console.error("Error adding cart:", error);
    }
  };

  // Update Cart
  const updateCart = async (updatedItems) => {
    if (!cart) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/${cart.id}`, {
        id: cart.id,
        items: updatedItems,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // Delete Cart
  const deleteCart = async () => {
    if (!customerId) {
      alert("Please enter a Customer ID.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/delete/${customerId}`);
      alert("Cart deleted successfully!");
      setCart(null);
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  // Empty Cart (Remove all items)
  const emptyCart = async () => {
    if (!cart) return;
    try {
      await axios.delete(`${API_BASE_URL}/${cart.id}`);
      alert("Cart emptied!");
      setCart(null);
    } catch (error) {
      console.error("Error emptying cart:", error);
    }
  };

  // Fetch cart when customerId is entered
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <input
        type="text"
        placeholder="Enter Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={fetchCart} disabled={!customerId}>
        Load Cart
      </button>
      <button onClick={addCart} disabled={!customerId}>
        Create Cart
      </button>

      {cart ? (
        <>
          <ul>
            {cart.items && cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <li key={index}>
                  {item.productName} - ${item.price} x {item.quantity}
                </li>
              ))
            ) : (
              <p>Cart is empty.</p>
            )}
          </ul>
          <button onClick={() => updateCart([...cart.items, { productName: "New Item", price: 20, quantity: 1 }])}>
            Add Item
          </button>
          <button onClick={emptyCart}>Empty Cart</button>
          <button onClick={deleteCart}>Delete Cart</button>
        </>
      ) : (
        <p>No cart found. Create a new one.</p>
      )}
    </div>
  );
};

export default Cart;
