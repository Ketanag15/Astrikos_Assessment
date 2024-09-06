// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">&copy; 2024 NGO REPO. All rights reserved.</p>
      <p className="text-sm pt-2">
        <a href="/about" className="hover:underline px-2">About Us</a> | 
        <a href="/contact" className="hover:underline px-2">Contact</a> | 
        <a href="/privacy" className="hover:underline px-2">Privacy Policy</a>
      </p>
    </footer>
  );
}

export default Footer;
