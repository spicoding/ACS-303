import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingResponse = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
        setBooking(bookingResponse.data);
        
        const flightResponse = await axios.get(`http://localhost:5000/api/flights/${bookingResponse.data.flight_id}`);
        setFlight(flightResponse.data);
      } catch (error) {
        console.error('Failed to fetch booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <div className="text-center py-8">Loading booking details...</div>;
  }

  if (!booking) {
    return <div className="text-center py-8">Booking not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-8">
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p>Thank you for choosing AeroSwift. Your booking is confirmed.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Booking ID:</p>
            <p className="font-medium">{booking.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status:</p>
            <p className="font-medium text-green-600">Confirmed</p>
          </div>
          <div>
            <p className="text-gray-600">Passenger:</p>
            <p className="font-medium">{booking.passenger_name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{booking.passenger_email}</p>
          </div>
          <div>
            <p className="text-gray-600">Number of Seats:</p>
            <p className="font-medium">{booking.seats}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Price:</p>
            <p className="font-medium text-xl">${booking.total_price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {flight && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">{flight.flight_number}</h3>
              <p className="text-gray-600">{flight.origin} → {flight.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">${flight.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Departure:</p>
              <p className="font-medium">{new Date(flight.departure_time).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Arrival:</p>
              <p className="font-medium">{new Date(flight.arrival_time).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}