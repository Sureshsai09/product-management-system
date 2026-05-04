import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products");
    }
  }, [navigate]);

  // 🔐 Login function
  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    API.post("/auth/login", { username, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        navigate("/products");
      })
      .catch(() => {
        alert("Invalid username or password");
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", color: "white" }}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;