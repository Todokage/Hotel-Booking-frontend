import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BookingForm from "./BookingForm";
import Navbar from "./Navbar";

const theme = {
  primary: "#0a5c36",
  secondary: "#1a7a4a",
  accent: "#ff7e33",
  accent2: "#ffb347",
  bg: "#f5f9f7",
  card: "#ffffff",
  border: "#d4e8de",
  shadow: "rgba(0,0,0,0.1)",
  text: "#333",
  lightText: "#666",
};

const slides = [
  {
    title: "Diani Beach",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description: "Pristine white sands and turquoise waters of the Indian Ocean",
  },
  {
    title: "Colobus Conservation",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sanctuary for the endangered Angolan colobus monkey and other wildlife",
  },
];

const hotels = [
  {
    name: "Diani Sea Resort",
    description:
      "Luxury beachfront resort with private beach access and spa facilities.",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Luxury", "Beachfront", "Spa"],
    roomType: "Single",
  },
  {
    name: "Baobab Beach Resort",
    description: "Family-friendly resort with water sports and entertainment.",
    price: 18000,
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    ],
    tags: ["Family", "All-Inclusive", "Activities"],
    roomType: "Double",
  },
];

const DianiPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navbarRef = useRef(null);
  const [showHomeBtn, setShowHomeBtn] = useState(false);

  // Modal state for BookingForm
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
      setShowHomeBtn(navbarBottom < 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slide rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Open modal and set hotel
  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setShowBookingModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedHotel(null);
  };

  return (
    
    <div
     
      style={{
        minHeight: "100vh",
        width: "100%",
        background: theme.bg,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
       
      {/* Beachy Hero Section with Diagonal Cut */}
      <div
        ref={navbarRef}
        style={{
          width: "100%",
          minHeight: "80vh",
          background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent2} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
          marginBottom: "-10vh",
        }}
      >
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4,
            filter: "contrast(120%) saturate(120%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 20px",
            maxWidth: "1200px",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              textTransform: "uppercase",
              textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            DIANI
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "#fff",
              letterSpacing: "0.1em",
            }}
          >
            {slides[currentSlide].title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {slides[currentSlide].description}
          </motion.p>
        </div>

        {/* Slide Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
            zIndex: 10,
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: "12px",
                height: "12px",
                background:
                  idx === currentSlide ? "#fff" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: idx === currentSlide ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Home Button */}
      {showHomeBtn && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            top: "24px",
            left: "24px",
            background: theme.accent,
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: 700,
            cursor: "pointer",
            zIndex: 100,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span style={{ fontSize: "1.2rem" }}>←</span> HOME
        </motion.button>
      )}

      {/* Resort Cards Section */}
      <section
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "80px auto 120px",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: theme.primary,
            textAlign: "center",
            marginBottom: "60px",
            fontSize: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            position: "relative",
            display: "inline-block",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Beach Resorts
          <span
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "0",
              width: "100%",
              height: "4px",
              background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`,
            }}
          ></span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "40px",
            padding: "0 20px",
          }}
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              style={{
                background: theme.card,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: `1px solid ${theme.border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "220px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    padding: "12px 20px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {hotel.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: theme.accent,
                          color: "#fff",
                          padding: "4px 12px",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "24px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "12px",
                    color: theme.primary,
                  }}
                >
                  {hotel.name}
                </h3>

                <p
                  style={{
                    color: theme.text,
                    marginBottom: "20px",
                    lineHeight: 1.5,
                    flex: 1,
                  }}
                >
                  {hotel.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: theme.accent,
                    }}
                  >
                    KSH {hotel.price.toLocaleString()}
                    <span
                      style={{
                        fontSize: "1rem",
                        color: theme.lightText,
                        fontWeight: 400,
                      }}
                    >
                      /night
                    </span>
                  </div>
                  <button
                    style={{
                      background: theme.primary,
                      color: "#fff",
                      border: "none",
                      padding: "12px 24px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onClick={() => handleBookNow(hotel)}
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedHotel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              zIndex: 2000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                padding: "2rem",
                minWidth: "340px",
                maxWidth: "95vw",
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#888",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ×
              </button>
              <BookingForm hotel={selectedHotel} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            overflow-x: hidden;
          }
          button {
            transition: all 0.3s ease;
          }
          button:hover {
            opacity: 0.9;
          }
          input, textarea {
            transition: all 0.3s ease;
          }
          input:focus, textarea:focus {
            outline: none;
            border-color: ${theme.accent} !important;
            box-shadow: 0 0 0 2px ${theme.accent}33;
          }
        `}
      </style>
    </div>
  );
};

export default DianiPage;