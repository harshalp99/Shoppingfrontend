import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  // Backend API Base URL (Order Service on port 8098)
  const API_BASE_URL = "http://localhost:8098/api/order";

  // Fetch Order by ID
  const fetchOrder = useCallback(async () => {
    if (!orderId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/${orderId}`);
      if (typeof response.data === "string") {
        alert("Order not found");
        setOrder(null);
      } else {
        setOrder(response.data);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }, [orderId]);

  // Add Order (Create a new order)
  const addOrder = async () => {
    try {
      const newOrder = {
        lineItems: [
          { productId: 101, productName: "Sample Item", quantity: 1, price: 50 },
        ],
      };
      const response = await axios.post(API_BASE_URL, newOrder);
      setOrder(response.data);
      setOrderId(response.data.orderId);
      alert("Order Created Successfully!");
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // Update Order
  const updateOrder = async (updatedItems) => {
    if (!order) return;
    try {
      const updatedOrder = { orderId: order.orderId, lineItems: updatedItems };
      const response = await axios.put(`${API_BASE_URL}/${order.orderId}`, updatedOrder);
      setOrder(response.data);
      alert("Order Updated Successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Delete Order
  const deleteOrder = async () => {
    if (!orderId) {
      alert("Please enter an Order ID.");
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/${orderId}`);
      alert("Order deleted successfully!");
      setOrder(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Fetch order when orderId is entered
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <div>
      <h2>Order Management</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchOrder} disabled={!orderId}>
        Load Order
      </button>
      <button onClick={addOrder}>
        Create Order
      </button>

      {order ? (
        <>
          <h3>Order Details</h3>
          <p>Order ID: {order.orderId}</p>
          <ul>
            {order.lineItems && order.lineItems.length > 0 ? (
              order.lineItems.map((item, index) => (
                <li key={index}>
                  {item.productName} - ${item.price} x {item.quantity}
                </li>
              ))
            ) : (
              <p>No items in order.</p>
            )}
          </ul>
          <button
            onClick={() =>
              updateOrder([...order.lineItems, { productId: 102, productName: "New Item", quantity: 2, price: 25 }])
            }
          >
            Add Item
          </button>
          <button onClick={deleteOrder}>Delete Order</button>
        </>
      ) : (
        <p>No order found. Create a new one.</p>
      )}
    </div>
  );
};

export default Order;
