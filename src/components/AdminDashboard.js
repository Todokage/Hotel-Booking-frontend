import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://your-backend-url.onrender.com/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
    }
  };

  const deleteBooking = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://hotel-booking-backend-zc4l.onrender.com/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter(b => b._id !== id));
    } catch {
      alert("Failed to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>
      <table className="bookings-table">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Room</th>
            <th>Dates</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="table-row">
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.roomType}</td>
              <td>{b.checkIn.slice(0, 10)} → {b.checkOut.slice(0, 10)}</td>
              <td>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteBooking(b._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;