import React, { useState } from "react";
import axios from "axios";
import "../styles/BookingForm.css";


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
      await axios.post(
        "https://hotel-booking-backend-zc4l.onrender.com/api/bookings",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookingSuccess(true);
    } catch {
      alert("Booking failed");
    }
  };

  if (bookingSuccess) {
    return (
      <div className="confirmation-container">
        <div className="checkmark">✓</div>
        <h3 className="confirmation-title">Booking Confirmed!</h3>
        <p>
          Your reservation at {hotel.name} has been confirmed. A receipt has
          been sent to {formData.email}
        </p>
        <button className="close-btn" onClick={() => window.location.reload()}>
          CLOSE
        </button>
      </div>
    );
  }

  return (
    <div className="booking-container">
      {/* Left Image */}
      <div className="image-section">
        {hotel.images?.length > 0 ? (
          <img src={hotel.images[0]} alt={hotel.name} className="hotel-img" />
        ) : (
          <div className="no-image" />
        )}
        <div className="hotel-info">
          <h2>{hotel.name}</h2>
          <p>{hotel.description}</p>
          <div className="price">KSH {hotel.price?.toLocaleString?.()}/night</div>
        </div>
      </div>

      {/* Right Form */}
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-grid">
          <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
          <SelectField
            label="Room Type"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            options={["Single", "Double"]}
          />
          <InputField label="Check-in" name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} />
          <InputField label="Check-out" name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} />
          <InputField label="Guests" name="guests" type="number" min="1" max="10" value={formData.guests} onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">
          CONFIRM BOOKING
        </button>
      </form>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, ...props }) => (
  <div className="input-group">
    <label>{label}</label>
    <input {...props} required />
  </div>
);

// Select Field Component
const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="input-group">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} required>
      <option value="" disabled>Select Room</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default BookingForm;
