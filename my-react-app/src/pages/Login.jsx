import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(" http://localhost:5001/user/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/Event");
      } else {
        throw new Error("Invalid login response. No token received.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <div className="auth-form-container">
        <div className="icon1">
          <img src="img/images.png" alt="Icon" />
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          {error && <p className="error" style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
