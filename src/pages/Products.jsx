import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ productName: '', productDescription: '', productPrice: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:9092/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addProduct = async () => {
        try {
            await axios.post('http://localhost:9092/api/products', newProduct);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:9092/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.productId}>
                        {product.productName} - ${product.productPrice}
                        <button onClick={() => deleteProduct(product.productId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Add Product</h3>
            <input type="text" placeholder="Name" value={newProduct.productName} onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })} />
            <input type="text" placeholder="Description" value={newProduct.productDescription} onChange={(e) => setNewProduct({ ...newProduct, productDescription: e.target.value })} />
            <input type="number" placeholder="Price" value={newProduct.productPrice} onChange={(e) => setNewProduct({ ...newProduct, productPrice: e.target.value })} />
            <button onClick={addProduct}>Add</button>
        </div>
    );
};

export default Products;