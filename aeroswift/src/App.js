import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:flightId" element={<BookingPage />} />
          <Route path="/confirm/:bookingId" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;