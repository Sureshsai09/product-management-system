import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    login(username, password)
      .then(res => {

        localStorage.setItem("token", res.data.token);

        navigate("/");

      })
      .catch(err => {

        alert("Invalid credentials");

      });

  };

  return (

    <div className="container mt-5">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;