import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for development
const mockFlights = [
  {
    id: 1,
    flight_number: "AA123",
    origin: "JFK",
    destination: "LAX",
    departure_time: "2025-12-15T08:00:00Z",
    arrival_time: "2025-12-15T11:00:00Z",
    price: 299.99,
    available_seats: 150
  },
  {
    id: 2,
    flight_number: "UA456",
    origin: "LAX",
    destination: "ORD",
    departure_time: "2025-12-16T09:00:00Z",
    arrival_time: "2025-12-16T12:00:00Z",
    price: 349.99,
    available_seats: 120
  }
];

export const searchFlights = async (origin, destination, date) => {
  // For development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockFlights), 500); // Simulate network delay
    });
  }

  // For production, use real API
  try {
    const response = await axios.get(`${API_BASE_URL}/flights/search`, {
      params: { origin, destination, date }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search flights:', error);
    return [];
  }
};