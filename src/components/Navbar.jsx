import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import { HomeIcon } from '@heroicons/react/solid'; // Importing HomeIcon for potential future use

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white font-bold p-4 flex justify-between items-center">
      
      <div className="flex items-center">
        
        <h1>NGO Repo</h1>
      </div>

      <Link to="/add-ngo">
        
        <button className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">
          Add NGOs +
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
