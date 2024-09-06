import React, { useState } from 'react';
import { addNGO } from '../firebase/firebaseConfig';

function NGOForm() {
  // State variables to manage form inputs
  const [ngoName, setNGOName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [dateOfRegistration, setDateOfRegistration] = useState('');
  const [ngoType, setNGOType] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactPersonPhone, setContactPersonPhone] = useState('');
  const [contactPersonID, setContactPersonID] = useState('');
  const [description, setDescription] = useState('');
  const [registrationDocuments, setRegistrationDocuments] = useState(null); // State to handle document uploads
  const [photos, setPhotos] = useState(null); // State to handle photo uploads
  const [imageUrl, setImageUrl] = useState(''); // State to handle NGO image URL

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const ngoDetails = {
      name: ngoName,
      registrationNumber,
      dateOfRegistration,
      ngoType,
      description,
      email,
      phone,
      website: website || null, // Optional field
      address,
      contactPerson: {
        name: contactPersonName,
        designation,
        contactPersonPhone,
        contactPersonID
      },
      registrationDocuments: registrationDocuments ? registrationDocuments.name : null, // Optional field
      photos: photos ? Array.from(photos).map(file => file.name) : [], // Convert file list to array of file names
      imageUrl: imageUrl || null, // Optional field
      rating: 0, // Default rating
      comments: [], // Default empty comments array
    };

    try {
      const ngoId = await addNGO(ngoDetails); // Add NGO to Firestore
      alert(`NGO added with ID: ${ngoId}`); // Alert on success
    } catch (error) {
      console.error("Error adding NGO: ", error); // Log error in console
      alert("Failed to add NGO"); // Alert on failure
    }
  };

  // Handle file upload for documents and photos
  const handleFileUpload = (e, setFile) => {
    setFile(e.target.files); // Set files to state
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mx-auto" style={{ width: '60%' }}>
      <h2 className="text-xl font-semibold mb-2">NGO Details</h2>
      <input
        type="text"
        placeholder="NGO Name"
        value={ngoName}
        onChange={(e) => setNGOName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="text"
        placeholder="NGO Registration Number"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="date"
        placeholder="Date of Registration"
        value={dateOfRegistration}
        onChange={(e) => setDateOfRegistration(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <select
        value={ngoType}
        onChange={(e) => setNGOType(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      >
        <option value="">Select NGO Type</option>
        <option value="trust">Trust</option>
        <option value="societal">Societal</option>
        <option value="non-profit company">Non-Profit Company</option>
        <option value="others">Others</option>
      </select>

      <textarea
        placeholder="NGO Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      />

      <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="url"
        placeholder="Website URL (Optional)"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <textarea
        placeholder="Office Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      />

      <h2 className="text-xl font-semibold mb-2">Contact Person Details</h2>
      <input
        type="text"
        placeholder="Contact Person Name"
        value={contactPersonName}
        onChange={(e) => setContactPersonName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="tel"
        placeholder="Contact Person Phone"
        value={contactPersonPhone}
        onChange={(e) => setContactPersonPhone(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
        style={{ borderRadius: '10px' }}
      />
      <input
        type="text"
        placeholder="Contact Person ID"
        value={contactPersonID}
        onChange={(e) => setContactPersonID(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      />

      <h2 className="text-xl font-semibold mb-2">Registration Documents</h2>
      <input
        type="file"
        multiple
        onChange={(e) => handleFileUpload(e, setPhotos)} // Handle file uploads
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      />

      <h2 className="text-xl font-semibold mb-2">Image URL</h2>
      <input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
        style={{ borderRadius: '10px' }}
      />

      <button type="submit" className="bg-blue-500 text-white p-2 px-5 rounded" style={{ borderRadius: '5px' }}>Add NGO</button>
    </form>
  );
}

export default NGOForm;
