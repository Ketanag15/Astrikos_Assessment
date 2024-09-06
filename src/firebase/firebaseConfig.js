// Import necessary functions from Firebase libraries
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration object with API keys and project details
const firebaseConfig = {
  apiKey: "AIzaSyB9tOc67p6XwHkv3cl0qO8fJaJCUHfYbSk",
  authDomain: "ngo-repo-fb.firebaseapp.com",
  projectId: "ngo-repo-fb",
  storageBucket: "ngo-repo-fb.appspot.com",
  messagingSenderId: "1018839857114",
  appId: "1:1018839857114:web:0031365dfa49245e8932e3",
  measurementId: "G-8LCPE6NP5Q"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get Firestore and Storage services from the Firebase app
const db = getFirestore(app);
const storage = getStorage(app);

// Function to add a new NGO to the Firestore database
export const addNGO = async (ngoDetails) => {
  try {
    // Add NGO details to the 'ngos' collection
    const docRef = await addDoc(collection(db, "ngos"), ngoDetails);
    return docRef.id; // Return the ID of the newly added document
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error('Failed to add NGO'); // Throw an error if the operation fails
  }
};

// Function to retrieve all NGOs from the Firestore database
export const getNGOs = async () => {
  try {
    // Get all documents from the 'ngos' collection
    const querySnapshot = await getDocs(collection(db, "ngos"));
    // Map each document to an object with the document ID and data
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Error getting NGOs: ", e);
    throw new Error('Failed to retrieve NGOs'); // Throw an error if the operation fails
  }
};

// Function to retrieve a specific NGO by its ID
export const getNGOById = async (id) => {
  try {
    // Reference to the specific NGO document
    const docRef = doc(db, "ngos", id);
    // Get the document snapshot
    const docSnap = await getDoc(docRef);
    // Return the document data if it exists, otherwise return null
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (e) {
    console.error("Error getting NGO by ID: ", e);
    throw new Error('Failed to retrieve NGO'); // Throw an error if the operation fails
  }
};

// Function to update the rating of a specific NGO
export const updateRating = async (id, newRating) => {
  try {
    // Reference to the specific NGO document
    const ngoRef = doc(db, "ngos", id);
    // Update the NGO's rating
    await updateDoc(ngoRef, { rating: newRating });
  } catch (e) {
    console.error("Error updating rating: ", e);
    throw new Error('Failed to update rating'); // Throw an error if the operation fails
  }
};

// Function to retrieve reviews for a specific NGO
export const getReviews = async (ngoId) => {
  try {
    // Reference to the 'reviews' sub-collection for the specific NGO
    const reviewsCollection = collection(db, "ngos", ngoId, "reviews");
    // Get all documents from the 'reviews' collection
    const querySnapshot = await getDocs(reviewsCollection);
    // Map each review document to its review text
    return querySnapshot.docs.map(doc => doc.data().review);
  } catch (e) {
    console.error("Error getting reviews: ", e);
    throw new Error('Failed to retrieve reviews'); // Throw an error if the operation fails
  }
};

// Function to add a review for a specific NGO
export const addReview = async (ngoId, reviewText) => {
  try {
    // Reference to the 'reviews' sub-collection for the specific NGO
    const reviewsCollection = collection(db, "ngos", ngoId, "reviews");
    // Add the review text to the 'reviews' collection
    await addDoc(reviewsCollection, { review: reviewText });
  } catch (e) {
    console.error("Error adding review: ", e);
    throw new Error('Failed to add review'); // Throw an error if the operation fails
  }
};
