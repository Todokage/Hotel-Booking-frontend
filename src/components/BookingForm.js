import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
  });

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
      alert("Booking successful");
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h2 className="form-title">Book a Room</h2>
      <input 
        name="name" 
        placeholder="Name" 
        onChange={handleChange} 
      />
      <input 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
      />
      <select 
        name="roomType" 
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>Select Room</option>
        <option value="Single">Single</option>
        <option value="Double">Double</option>
      </select>
      <input 
        name="checkIn" 
        type="date" 
        onChange={handleChange} 
      />
      <input 
        name="checkOut" 
        type="date" 
        onChange={handleChange} 
      />
      <button type="submit" className="submit-btn">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;