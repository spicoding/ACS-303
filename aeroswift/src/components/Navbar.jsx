import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">AeroSwift</Link>
        <div>
          <Link to="/" className="hover:text-blue-200 px-3">Home</Link>
        </div>
      </div>
    </nav>
  );
}