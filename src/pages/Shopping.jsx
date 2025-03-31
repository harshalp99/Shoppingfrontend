import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8087/api/shopping-service";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ productName: "", productPrice: 0 }); // Added state for new product
  const customerId = 1; // Replace with dynamic customer ID

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:9092/api/products", newProduct);
      fetchProducts();
      setNewProduct({ productName: "", productPrice: 0 }); // Reset new product form
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer/${customerId}/cart`);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customer/${customerId}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customer/${customerId}/cart`, { productId });
      setCart(response.data);
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customer/${customerId}/order`);
      setOrders([...orders, response.data]);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div>
      <h1>Shopping Page</h1>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            {product.productName} - ${product.productPrice}
            <button onClick={() => addToCart(product.productId)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h2>Add New Product</h2>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.productName}
          onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.productPrice}
          onChange={(e) => setNewProduct({ ...newProduct, productPrice: parseFloat(e.target.value) })}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <h2>Cart</h2>
      {cart ? (
        <div>
          <p>Items in Cart: {cart.items.length}</p>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>Order ID: {order.orderId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Shopping;