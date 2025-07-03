import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import AdminDashboard from "./components/AdminDashboard.js";
import Auth from "./components/Auth.js";
import Location from "./components/location.js";
import DianiPage from "./components/DianiPage.js";
import MonacoPage from "./components/MonacoPage.js";
import TokyoPage from "./components/TokyoPage.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      {!showAuth ? (
        <LandingPage onStart={() => setShowAuth(true)} />
      ) : (
        <div className="bg-gray-100 min-h-screen">
          <Navbar user={user} setUser={setUser} />

          <Routes>
            <Route
              path="/"
              element={
                !user ? (
                  <div className="flex justify-center gap-10">
                    <Auth onLogin={setUser} />
                  </div>
                ) : user.isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <>
                    <Location />
                    <About />
                    <Footer />
                  </>
                )
              }
            />
            <Route path="/visit/diani" element={<DianiPage />} />
            <Route path="/visit/monaco" element={<MonacoPage />} />
            <Route path="/visit/tokyo" element={<TokyoPage />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
