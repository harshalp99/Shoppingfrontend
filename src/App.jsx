import React from "react";
import { Routes, Route } from "react-router-dom";  // ❌ Remove `Router`
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
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
