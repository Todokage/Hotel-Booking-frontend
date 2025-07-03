import React from "react";

const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Hotel Booking</h1>
      <p className="landing-description">
        Book your perfect stay with ease. Enjoy a seamless experience for guests and admins alike.
      </p>
      <button
        onClick={onStart}
        className="start-button"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;