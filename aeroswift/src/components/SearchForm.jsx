import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: new Date().toISOString().split('T')[0] // Default to today
  });
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams); // Pass search params to parent
    navigate(`/?origin=${searchParams.origin}&destination=${searchParams.destination}&date=${searchParams.date}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Find Your Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="text"
              value={searchParams.origin}
              onChange={(e) => setSearchParams({...searchParams, origin: e.target.value.toUpperCase()})}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="City or airport"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="text"
              value={searchParams.destination}
              onChange={(e) => setSearchParams({...searchParams, destination: e.target.value.toUpperCase()})}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="City or airport"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
            <input
              type="date"
              value={searchParams.date}
              onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}