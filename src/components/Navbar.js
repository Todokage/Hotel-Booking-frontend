import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleDestinationClick = (destination) => {
    setShowDropdown(false);
    navigate(`/visit/${destination}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <nav
        style={{
          width: "100%", // Changed from 100vw
          background: "rgba(0, 0, 0, 0.85)",
          color: "#fff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1000,
          boxSizing: "border-box",
          overflowX: "hidden", // Prevent horizontal scrolling
        }}
      >
        <button
          onClick={handleHomeClick}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            letterSpacing: "0.1em",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          ToDo Travels
        </button>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
            overflow: "hidden",
          }}
        >
          {/* Destinations Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1rem",
                textTransform: "capitalize",
              }}
            >
              Destinations ▾
            </button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#222",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  zIndex: 1001,
                }}
              >
                {["diani", "monaco", "tokyo"].map((place) => (
                  <button
                    key={place}
                    onClick={() => handleDestinationClick(place)}
                    style={{
                      display: "block",
                      padding: "0.75rem 1.5rem",
                      background: "none",
                      border: "none",
                      color: "#fff",
                      textAlign: "left",
                      width: "100%",
                      cursor: "pointer",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {place}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login / Logout buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                border: "none",
                color: "#fff",
                padding: "0.5rem 1.2rem",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              style={{
                background: "#10b981",
                border: "none",
                color: "#fff",
                padding: "0.5rem 1.2rem",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Modal for Login */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "2rem",
              minWidth: "300px",
              maxWidth: "90%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.75rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#333",
              }}
            >
              &times;
            </button>
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
