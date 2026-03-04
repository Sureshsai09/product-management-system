import React, { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  filterProducts,
  searchProducts
} from "../services/productService";

import { useNavigate } from "react-router-dom";

function ProductList() {

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchName, setSearchName] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, [page, sortBy, direction]);

  const loadProducts = () => {

    getProducts(page, 5, sortBy, direction)
      .then(res => {

        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);

      })
      .catch(err => console.log(err));

  };

  const handleDelete = (id) => {

    deleteProduct(id)
      .then(() => loadProducts())
      .catch(err => console.log(err));

  };

  const handleFilter = () => {

    if (!minPrice || !maxPrice) {
      loadProducts();
      return;
    }

    filterProducts(minPrice, maxPrice)
      .then(res => {

        setProducts(res.data);
        setTotalPages(1);

      })
      .catch(err => console.log(err));

  };

  const handleSearch = () => {

    if (!searchName) {
      loadProducts();
      return;
    }

    searchProducts(searchName)
      .then(res => {

        setProducts(res.data);
        setTotalPages(1);

      })
      .catch(err => console.log(err));

  };

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Product List</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>

      </div>

      {/* SEARCH */}

      <div className="row mb-3">

        <div className="col-4">

          <input
            type="text"
            className="form-control"
            placeholder="Search product name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

        </div>

        <div className="col">

          <button
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>

      </div>

      {/* SORTING */}

      <div className="row mb-3">

        <div className="col-3">

          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >

            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>

          </select>

        </div>

        <div className="col-3">

          <select
            className="form-control"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >

            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>

          </select>

        </div>

      </div>

      {/* FILTER */}

      <div className="row mb-3">

        <div className="col">

          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

        </div>

        <div className="col">

          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

        </div>

        <div className="col">

          <button
            className="btn btn-success"
            onClick={handleFilter}
          >
            Filter
          </button>

        </div>

      </div>

      {/* TABLE */}

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>

            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map(product => (

            <tr key={product.id}>

              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit-product/${product.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* PAGINATION */}

      <div className="d-flex justify-content-center">

        <button
          className="btn btn-secondary me-2"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span className="mt-2">

          Page {page + 1} of {totalPages}

        </span>

        <button
          className="btn btn-secondary ms-2"
          disabled={page + 1 === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>

  );

}

export default ProductList;