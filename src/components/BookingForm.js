import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingForm.css";

const theme = {
  primary: "#0a5c36",
  accent: "#ff7e33",
  border: "#d4e8de",
};

const BookingForm = ({ hotel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomType: hotel.roomType || "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    phone: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/bookings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookingSuccess(true);
    } catch {
      alert("Booking failed");
    }
  };

  if (bookingSuccess) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
            color: "#4CAF50",
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            marginBottom: "16px",
            color: theme.primary,
          }}
        >
          Booking Confirmed!
        </h3>
        <p style={{ marginBottom: "24px", lineHeight: 1.6 }}>
          Your reservation at {hotel.name} has been confirmed. A receipt has
          been sent to {formData.email}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "16px 32px",
            background: theme.primary,
            color: "#fff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "1rem",
            borderRadius: 6,
          }}
        >
          CLOSE
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "40px auto",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        minHeight: 480,
      }}
    >
      {/* Left Side - Image with Overlay */}
      <div
        style={{
          flex: "1 1 50%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {hotel.images && hotel.images.length > 0 ? (
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#ccc",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "24px",
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            color: "#fff",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "2.4rem",
              fontWeight: 700,
              textShadow: "0 2px 6px rgba(0,0,0,0.7)",
            }}
          >
            {hotel.name}
          </h2>
          <p
            style={{
              marginTop: 8,
              fontSize: "1rem",
              lineHeight: 1.4,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {hotel.description}
          </p>
          <div
            style={{
              marginTop: 12,
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: theme.accent,
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            KSH {hotel.price?.toLocaleString?.()}/night
          </div>
        </div>
      </div>

      {/* Right Side - Booking Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: "1 1 50%",
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
          boxSizing: "border-box",
          backgroundColor: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <SelectField
            label="Room Type"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            options={["Single", "Double"]}
          />
          <InputField
            label="Check-in"
            name="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleChange}
          />
          <InputField
            label="Check-out"
            name="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={handleChange}
          />
          <InputField
            label="Guests"
            name="guests"
            type="number"
            min="1"
            max="10"
            value={formData.guests}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: 10,
            padding: "16px",
            background: theme.accent,
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontSize: "1.1rem",
            cursor: "pointer",
            borderRadius: 6,
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#e66a0d")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = theme.accent)
          }
        >
          CONFIRM BOOKING
        </button>
      </form>
    </div>
  );
};

// Input field component
const InputField = ({ label, ...props }) => (
  <div style={{ flex: "1 1 45%", minWidth: 220, display: "flex", flexDirection: "column" }}>
    <label style={labelStyle}>{label}</label>
    <input {...props} style={inputStyle} required />
  </div>
);

// Select field component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div style={{ flex: "1 1 45%", minWidth: 220, display: "flex", flexDirection: "column" }}>
    <label style={labelStyle}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={inputStyle}
      required
    >
      <option value="" disabled>
        Select Room
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const labelStyle = {
  marginBottom: 6,
  fontWeight: 600,
  fontSize: "0.9rem",
  color: "#333",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: `1px solid ${theme.border}`,
  fontSize: "1rem",
  borderRadius: 6,
  outline: "none",
  transition: "border-color 0.2s ease",
};

export default BookingForm;
