import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "register" ? "register" : "login";
    
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, 
        mode === "login" ? { email: formData.email, password: formData.password } : formData
      );
      
      if (mode === "register") {
        alert("Registration successful! Please log in.");
        setMode("login");
        setFormData({ name: "", email: "", password: "" });
      } else {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        onLogin(res.data.user);
      }
    } catch {
      alert(`${mode === "register" ? "Registration" : "Login"} failed`);
    }
  };

  return (
    <div className="auth-overlay">
      <section className="auth-modal">
        <nav className="auth-toggle">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => setMode("register")}
            type="button"
          >
            Register
          </button>
        </nav>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              required
              autoComplete="name"
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
            autoComplete="email"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          <button type="submit" className="auth-submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Auth;