import React, { useState } from "react";
import BookingForm from "./BookingForm";
import "../styles/HotelList.css"; 
const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    description: "Luxury hotel in the heart of Paris with stunning views.",
  },
  {
    id: 2,
    name: "Seaside Resort",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    description: "Relax by the beach in this tropical paradise.",
  },
  {
    id: 3,
    name: "Mountain Retreat",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
    description: "Experience tranquility in the Japanese mountains.",
  },
];

export default function HotelList() {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="hotel-list-container">
      {!selectedHotel ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedHotel(hotel)}
            >
              <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-800 mb-2">{hotel.name}</h2>
                <p className="text-gray-600 text-sm mb-1">{hotel.location}</p>
                <p className="text-gray-500 text-xs">{hotel.description}</p>
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHotel(hotel);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={() => setSelectedHotel(null)}
          >
            ← Back to Hotels
          </button>
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            <img src={selectedHotel.image} alt={selectedHotel.name} className="w-64 h-40 object-cover rounded-lg" />
            <div>
              <h2 className="text-2xl font-bold">{selectedHotel.name}</h2>
              <p className="text-gray-700">{selectedHotel.location}</p>
              <p className="text-gray-500">{selectedHotel.description}</p>
            </div>
          </div>
          <BookingForm hotel={selectedHotel} />
        </div>
      )}
    </div>
  );
}