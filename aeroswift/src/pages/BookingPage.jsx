import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BookingPage() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    seats: 1
  });

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights/${flightId}`);
        setFlight(response.data);
      } catch (error) {
        console.error('Failed to fetch flight:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        flightId,
        ...passengerData
      });
      navigate(`/confirm/${response.data.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading flight details...</div>;
  }

  if (!flight) {
    return <div className="text-center py-8">Flight not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Book Flight {flight.flight_number}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{flight.origin} → {flight.destination}</h2>
            <p className="text-gray-600">Departure: {new Date(flight.departure_time).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">${flight.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">{flight.available_seats} seats available</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={passengerData.name}
                onChange={(e) => setPassengerData({...passengerData, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={passengerData.email}
                onChange={(e) => setPassengerData({...passengerData, email: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Seats (Max: {flight.available_seats})
            </label>
            <input
              type="number"
              min="1"
              max={flight.available_seats}
              value={passengerData.seats}
              onChange={(e) => setPassengerData({...passengerData, seats: parseInt(e.target.value)})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: ${(flight.price * passengerData.seats).toFixed(2)}
            </p>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}