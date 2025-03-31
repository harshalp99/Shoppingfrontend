import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [customer, setCustomer] = useState({
    customerName: "",
    customerEmail: "",
    customerBillingAddress: {
      doorNo: "",
      streetName: "",
      layout: "",
      city: "",
      pincode: "",
    },
    customerShippingAddress: {
      doorNo: "",
      streetName: "",
      layout: "",
      city: "",
      pincode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleAddressChange = (e, addressType) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [addressType]: { ...customer[addressType], [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/addCustomer", customer);
      alert("Customer added successfully: " + JSON.stringify(response.data));
    } catch (error) {
      alert("Error adding customer: " + error.message);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="customerName" value={customer.customerName} onChange={handleChange} required />
        
        <label>Email:</label>
        <input type="email" name="customerEmail" value={customer.customerEmail} onChange={handleChange} required />
        
        <h3>Billing Address</h3>
        <input type="text" name="doorNo" placeholder="Door No" value={customer.customerBillingAddress.doorNo} onChange={(e) => handleAddressChange(e, "customerBillingAddress")} required />
        <input type="text" name="streetName" placeholder="Street Name" value={customer.customerBillingAddress.streetName} onChange={(e) => handleAddressChange(e, "customerBillingAddress")} required />
        <input type="text" name="layout" placeholder="Layout" value={customer.customerBillingAddress.layout} onChange={(e) => handleAddressChange(e, "customerBillingAddress")} required />
        <input type="text" name="city" placeholder="City" value={customer.customerBillingAddress.city} onChange={(e) => handleAddressChange(e, "customerBillingAddress")} required />
        <input type="text" name="pincode" placeholder="Pincode" value={customer.customerBillingAddress.pincode} onChange={(e) => handleAddressChange(e, "customerBillingAddress")} required />

        <h3>Shipping Address</h3>
        <input type="text" name="doorNo" placeholder="Door No" value={customer.customerShippingAddress.doorNo} onChange={(e) => handleAddressChange(e, "customerShippingAddress")} required />
        <input type="text" name="streetName" placeholder="Street Name" value={customer.customerShippingAddress.streetName} onChange={(e) => handleAddressChange(e, "customerShippingAddress")} required />
        <input type="text" name="layout" placeholder="Layout" value={customer.customerShippingAddress.layout} onChange={(e) => handleAddressChange(e, "customerShippingAddress")} required />
        <input type="text" name="city" placeholder="City" value={customer.customerShippingAddress.city} onChange={(e) => handleAddressChange(e, "customerShippingAddress")} required />
        <input type="text" name="pincode" placeholder="Pincode" value={customer.customerShippingAddress.pincode} onChange={(e) => handleAddressChange(e, "customerShippingAddress")} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Checkout;
