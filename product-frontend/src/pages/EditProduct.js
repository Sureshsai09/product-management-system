import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {

    getProductById(id)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const product = {
      name: name,
      price: price
    };

    updateProduct(id, product)
      .then(() => {
        alert("Product updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (

    <div className="container mt-4">

      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn btn-warning">
          Update Product
        </button>

      </form>

    </div>

  );
}

export default EditProduct;