import React, { useState } from "react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please fill all fields");
      return;
    }

    const product = {
      name: name,
      price: price
    };

    createProduct(product)
      .then(() => {
        alert("Product created successfully");
        navigate("/"); // go back to product list
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn btn-success">
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;