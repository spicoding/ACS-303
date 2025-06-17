import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import { searchFlights } from '../api/flights';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValues, setSearchValues] = useState({
    origin: searchParams.get('origin') || '',
    destination: searchParams.get('destination') || '',
    date: searchParams.get('date') || new Date().toISOString().split('T')[0]
  });

  const handleSearch = async (params) => {
    setSearchValues(params);
    setLoading(true);
    try {
      const results = await searchFlights(params.origin, params.destination, params.date);
      setFlights(results);
    } catch (error) {
      console.error('Failed to fetch flights:', error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  // Search on page load if URL has params
  useEffect(() => {
    if (searchValues.origin && searchValues.destination && searchValues.date) {
      handleSearch(searchValues);
    }
  }, []);

  return (
    <div>
      <SearchForm 
        onSearch={handleSearch}
        initialValues={searchValues}
      />
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Searching for flights...</p>
        </div>
      ) : flights.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Flights from {searchValues.origin} to {searchValues.destination} on {searchValues.date}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      ) : (
        searchValues.origin && searchValues.destination && (
          <div className="text-center py-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">No flights found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search criteria</p>
          </div>
        )
      )}
    </div>
    
  );
}