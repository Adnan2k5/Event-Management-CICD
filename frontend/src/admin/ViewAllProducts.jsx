import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/product/viewallproducts`);
      setProducts(response.data);
      setError('');
    } 
    catch (err) 
    {
      setError('Failed to fetch products. ' + err.message);
    }
  };

  return (
    <div className="product-table-container">
      <h3 className="product-heading">All Products</h3>

      <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{error}</p>

      <div className="table-responsive">
        <table className="product-table" style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>URL</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>₹{product.cost}</td>
                <td>
                  <a href={product.url} target="_new" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <img
                    src={`${config.url}/product/displayproductimage?id=${product.id}`}
                    alt="Product"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllProducts;