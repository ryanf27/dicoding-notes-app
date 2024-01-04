import React, { useState } from "react";
import { login, putAccessToken } from "../utils/utils";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password });

      if (result.data.accessToken) {
        await putAccessToken(result.data.accessToken);
        window.location.href = "/";
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
