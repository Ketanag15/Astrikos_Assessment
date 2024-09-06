import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import routing components
import NGODetails from './components/NGODetails'; // Import component for displaying NGO details
import NGOForm from './components/NGOForm'; // Import component for adding a new NGO
import NGOList from './components/NGOList'; // Import component for listing NGOs
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer';  // Import Footer component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar component: visible on all pages */}
        <Navbar />

        {/* Main content area: adjusts to fill available space */}
        <main className="flex-grow">
          {/* Define routes for different application views */}
          <Routes>
            {/* Route for the homepage displaying a list of NGOs */}
            <Route path="/" element={<NGOList />} />
            {/* Route for displaying details of a specific NGO by ID */}
            <Route path="/ngo/:id" element={<NGODetails />} />
            {/* Route for displaying the form to add a new NGO */}
            <Route path="/add-ngo" element={<NGOForm />} />
          </Routes>
        </main>

        {/* Footer component: visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
