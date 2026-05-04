import "./Products.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔥 FETCH PRODUCTS
  const fetchProducts = () => {
    setLoading(true);

    if (search.trim() !== "") {
      API.get(`/products/search?name=${search}`)
        .then(res => setProducts(res.data))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    } else {
      API.get(`/products?page=${page}&size=5`)
        .then(res => setProducts(res.data.content))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  // ➕ ADD / UPDATE
  const addProduct = () => {
    if (!name || !price || !quantity) {
      setError("All fields are required");
      return;
    }

    setError("");

    if (editingId) {
      API.put(`/products/${editingId}`, {
        name,
        price: Number(price),
        quantity: Number(quantity)
      }).then(() => {
        setEditingId(null);
        fetchProducts();
        setName("");
        setPrice("");
        setQuantity("");
      });
    } else {
      API.post("/products", {
        name,
        price: Number(price),
        quantity: Number(quantity)
      }).then(() => {
        fetchProducts();
        setName("");
        setPrice("");
        setQuantity("");
      });
    }
  };

  // ❌ DELETE
  const deleteProduct = (id) => {
    API.delete(`/products/${id}`)
      .then(() => fetchProducts())
      .catch(err => console.log(err));
  };

  return (
  <div className="container">
    <h2 className="title">Product Dashboard</h2>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <div className="form">
      <input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
      <input value={price} placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input value={quantity} placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />

      <button className="add-btn" onClick={addProduct}>
        {editingId ? "Update" : "Add"}
      </button>
    </div>

    <input
      placeholder="Search..."
      value={search}
      onChange={(e) => {
        setPage(0);
        setSearch(e.target.value);
      }}
    />

    {loading && <p>Loading...</p>}

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>{p.quantity}</td>
            <td>
              <button className="edit-btn" onClick={() => {
                setEditingId(p.id);
                setName(p.name);
                setPrice(p.price);
                setQuantity(p.quantity);
              }}>
                Edit
              </button>

              <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {!loading && products.length === 0 && (
      <p style={{ textAlign: "center" }}>No products found</p>
    )}

    {search.trim() === "" && (
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 0))}>
          Prev
        </button>

        <span>Page {page + 1}</span>

        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    )}
  </div>
);


}

export default Products;