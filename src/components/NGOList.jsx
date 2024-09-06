import React, { useEffect, useState } from 'react';
import { getNGOs } from '../firebase/firebaseConfig'; // Function to fetch NGO data from Firebase
import { Link } from 'react-router-dom'; // Component for navigation links

function NGOList() {
  const [ngos, setNGOs] = useState([]); // State to store the list of NGOs

  useEffect(() => {
    // Fetch NGO data from Firebase when the component mounts
    async function fetchNGOs() {
      const data = await getNGOs();
      setNGOs(data);
    }
    fetchNGOs();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to truncate NGO description if it exceeds a certain length
  const truncateDescription = (description, limit) => {
    return description.length > limit ? description.slice(0, limit) + '...' : description;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
      {/* Render each NGO as a card */}
      {ngos.map((ngo) => (
        <div
          key={ngo.id}
          className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl"
          style={{
            transition: 'box-shadow 0.3s ease-in-out', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <img
            src={ngo.imageUrl || 'https://via.placeholder.com/150'} // Use placeholder if no image URL
            alt={ngo.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{ngo.name}</h3>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-1">★</span> 
              <span>{ngo.rating || 0} / 5</span>
            </div>
            <p className="text-gray-600 mb-2">
              {truncateDescription(ngo.description || '', 150)} 
            </p>
            <Link
              to={`/ngo/${ngo.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NGOList;
