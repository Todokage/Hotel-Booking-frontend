import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import "../styles/Navbar.css"; // <-- Create this file

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleHomeClick = () => navigate("/");
  const handleDestinationClick = (destination) => {
    setShowDropdown(false);
    navigate(`/visit/${destination}`);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleLoginClick = () => setShowLoginModal(true);
  const closeModal = () => setShowLoginModal(false);

  return (
    <>
      <nav className="navbar">
        <button className="logo-btn" onClick={handleHomeClick}>
          ToDo Travels
        </button>

        <div className="nav-links">
          <div className="dropdown-wrapper">
            <button className="dropdown-btn" onClick={() => setShowDropdown((prev) => !prev)}>
              Destinations ▾
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                {["diani", "monaco", "tokyo"].map((place) => (
                  <button
                    key={place}
                    className="dropdown-item"
                    onClick={() => handleDestinationClick(place)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {place}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          )}
        </div>
      </nav>

      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <Auth
              onLogin={(user) => {
                setUser(user);
                setShowLoginModal(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
