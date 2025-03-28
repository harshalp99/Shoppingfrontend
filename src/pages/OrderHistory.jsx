import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      {orders.length === 0 ? <p>No orders found.</p> : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item">
              Order #{order.id} - {order.customer.name} - Total Items: {order.items.length}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
