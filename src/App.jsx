import React from "react";
import { Routes, Route } from "react-router-dom";  
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    marginTop: "80px",
    padding: "20px",
  }
};

export default App;
