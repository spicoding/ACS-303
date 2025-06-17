import { Link } from 'react-router-dom';

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{flight.flightNumber}</h3>
            <p className="text-gray-600">{flight.origin} → {flight.destination}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {flight.availableSeats} seats left
          </span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Departure</p>
            <p className="font-medium">{new Date(flight.departureTime).toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Price</p>
            <p className="text-2xl font-bold text-blue-600">${flight.price.toFixed(2)}</p>
          </div>
        </div>
        
        <Link
          to={`/book/${flight.id}`}
          className="mt-4 block w-full bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}