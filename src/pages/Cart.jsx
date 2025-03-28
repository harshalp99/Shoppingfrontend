import React from "react";
import { useCart } from "../context/CartProvider";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <ul className="list-group">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ${item.price}
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
  <div className="mt-3">
    <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
  </div>
)}
    </div>
  );
};

export default Cart;
