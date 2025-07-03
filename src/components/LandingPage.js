import React from "react";
import "../styles/LandingPage.css"; 
const LandingPage = ({ onStart }) => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">ToDo Travels</h1>
      <p className="landing-description">
        Book your perfect stay with ease. Enjoy a seamless experience.
      </p>
      <button
        onClick={onStart}
        className="start-button"
      >
        BOOK NOW
      </button>
    </div>
  );
};

export default LandingPage;