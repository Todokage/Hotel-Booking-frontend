import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      const res = await axios.post(`https://hotel-booking-backend-zc4l.onrender.com/api/auth/${endpoint}`, 
        mode === "login" ? { email: formData.email, password: formData.password } : formData
      );
      
      if (mode === "register") {
        toast.success("Registration successful! Please log in.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setMode("login");
        setFormData({ name: "", email: "", password: "" });
      } else {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          onLogin(res.data.user);
        }, 2000); // Wait for toast to show
      }
    } catch {
      toast.error(`${mode === "register" ? "Registration" : "Login"} failed`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="auth-overlay">
      <ToastContainer />
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