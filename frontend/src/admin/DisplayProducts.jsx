import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayProduct = () => 
{
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${config.url}/product/viewallproducts`);
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await axios.post(`${config.url}/product/displayproductbyid?pid=${id}`);
      setProductDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching product: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchProductById(id);
    } 
    else 
    {
      setProductDetails(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Product Details</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Product:</strong></label>
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Product --</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {productDetails && (
        <div className="card mt-3">
          <img
            src={`${config.url}/product/displayproductimage?id=${productDetails.id}`}
            className="card-img-top"
            alt="Product"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{productDetails.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {productDetails.category}<br />
              <strong>Description:</strong> {productDetails.description}<br />
              <strong>Cost:</strong> ₹{productDetails.cost}<br />
              <strong>URL:</strong> <a href={productDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayProduct;