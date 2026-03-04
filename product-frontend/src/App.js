import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div style={{textAlign:"center"}}>
        <h1>Product Management System</h1>

        <Routes>

  <Navbar />

  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProductList />} />
    <Route path="/add-product" element={<AddProduct />} />
    <Route path="/edit-product/:id" element={<EditProduct />} />
  </Routes>
  <Route
  path="/"
  element={
    <PrivateRoute>
      <ProductList />
    </PrivateRoute>
  }
/>

<Route
  path="/add-product"
  element={
    <PrivateRoute>
      <AddProduct />
    </PrivateRoute>
  }
/>

<Route
  path="/edit-product/:id"
  element={
    <PrivateRoute>
      <EditProduct />
    </PrivateRoute>
  }
/>

</Routes>

      </div>
    </Router>
  );
}

export default App;