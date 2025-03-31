import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Shopping App</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/home" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/products" style={styles.link}>Products</Link>
        </li>
        <li>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </li>
        <li>
          <Link to="/orders" style={styles.link}>Orders</Link>
        </li>
        <li>
          <Link to="/checkout" style={styles.link}>Place Order</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#222",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 30px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background 0.3s ease",
  },
  linkHover: {
    background: "#444",
  }
};

export default Navbar;
