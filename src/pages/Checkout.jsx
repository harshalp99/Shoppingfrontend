import React, { useState } from "react";
import api from "../api/axiosInstance";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.address) {
      alert("Please fill all fields.");
      return;
    }

    const orderData = { customer, items: cart };

    try {
      await api.post("/orders", orderData);
      alert("Order placed successfully!");
      clearCart(); // Empty the cart after successful order
      navigate("/orders");
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <textarea name="address" className="form-control" onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
