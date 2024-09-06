import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNGOById, updateRating, addReview, getReviews } from '../firebase/firebaseConfig';

function NGODetails() {
  const { id } = useParams(); // Get the NGO ID from the URL
  const [ngo, setNGO] = useState(null); // State to store NGO details
  const [rating, setRating] = useState(null); // State to store current rating
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [newRating, setNewRating] = useState(0); // State to handle new rating input
  const [newReview, setNewReview] = useState(''); // State to handle new review input

  useEffect(() => {
    // Fetch NGO details and reviews when component mounts or ID changes
    async function fetchNGO() {
      const data = await getNGOById(id);
      setNGO(data);
      const reviewData = await getReviews(id);
      setReviews(reviewData);
    }
    fetchNGO();
  }, [id]);

  const handleRating = async () => {
    await updateRating(id, newRating); // Update the rating in Firestore
    setRating(newRating); // Update the rating state
    setNewRating(0); // Clear the input field
  };

  const handleReviewSubmit = async () => {
    if (newReview.trim()) {
      await addReview(id, newReview); // Add the new review to Firestore
      setReviews(prevReviews => [...prevReviews, newReview]); // Update the reviews state
      setNewReview(''); // Clear the input field
    }
  };

  if (!ngo) {
    return <p>Loading...</p>; // Display loading text if NGO data is not available
  }

  return (
    <div className="p-10 mx-40">
      <h1 className="text-3xl font-bold mb-4">{ngo.name}</h1>
      <img
        src={ngo.imageUrl || 'https://via.placeholder.com/600x400'} // Placeholder if no image
        alt={ngo.name}
        className="w-full h-60 object-cover mb-4"
      />
      <div className="mb-4">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="text-xl">{ngo.rating || 0} / 5</span>
      </div>
      <p className="text-gray-700 mb-4">{ngo.description}</p>
      <h2 className="text-2xl font-semibold my-3">Contact Information</h2>
      <p><strong>Email:</strong> {ngo.email}</p>
      <p><strong>Phone:</strong> {ngo.phone}</p>
      <p><strong>Website:</strong> <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{ngo.website}</a></p>
      <p><strong>Address:</strong> {ngo.address}</p>
      <h2 className="text-2xl font-semibold my-3">Contact Person Details</h2>
      <p><strong>Name:</strong> {ngo.contactPerson.name}</p>
      <p><strong>Designation:</strong> {ngo.contactPerson.designation}</p>
      <p><strong>Phone:</strong> {ngo.contactPerson.contactPersonPhone}</p>
      <p><strong>ID:</strong> {ngo.contactPerson.contactPersonID}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Rate This NGO</h2>
        <div className="flex items-center mb-4">
          <input
            type="number"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <button onClick={handleRating} className="ml-4 bg-blue-500 text-white p-2 rounded">Submit Rating</button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          rows="4"
          className="border p-2 rounded w-full mb-4"
        />
        <button onClick={handleReviewSubmit} className="bg-blue-500 text-white p-2 rounded">Submit Review</button>

        <h2 className="text-xl font-semibold mt-8">Reviews</h2>
        <div className="mt-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b py-2">
                <p>{review}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NGODetails;