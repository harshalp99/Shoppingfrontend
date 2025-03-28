import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useCart } from "../context/CartProvider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/products") // Calls backend API
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
