import React, { useState } from 'react';
import LandingPage from './components/LandingPage.js';
import AdminDashboard from "./components/AdminDashboard";
import Auth from './components/Auth.js';
import BookingForm from './components/BookingForm.js';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  if (!showAuth) {
    return <LandingPage onStart={() => setShowAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Hotel Booking Website</h1>
      {!user ? (
        <div className="flex justify-center gap-10">
          <Auth onLogin={setUser} />
        </div>
      ) : user.isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <p className="text-center mb-4">Welcome, {user.name}</p>
          <BookingForm />
        </>
      )}
    </div>
  );
}

export default App;