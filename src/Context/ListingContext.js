import React, { useContext, useState, createContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Config/firebase.js";
import { useAuth } from "./AuthorizationContext.js"; // Import the useAuth hook

export const ListingContext = createContext();

export function useListing() {
  return useContext(ListingContext);
}

export function ListingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth(); // Make sure this is the correct field from your auth context

  async function createListing(listingData) {
    setLoading(true);
    try {
      // Check if the currentUser is not null
      if (currentUser) {
        // Include the user's ID in the listing data
        const listingWithUserID = {
          ...listingData,
          seller: currentUser.uid // Add the userId field
        };

        const docRef = await addDoc(collection(db, "listings"), listingWithUserID); // Make sure the collection name is correct
        console.log("Listing created with ID: ", docRef.id);
        setLoading(false);
        return docRef.id; 
      } else {
        throw new Error("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error adding listing: ", error);
      setLoading(false);
      return null;
    }
  }

  const value = {
    createListing,
    loading
  };

  return (
    <ListingContext.Provider value={value}>
      {!loading && children}
    </ListingContext.Provider>
  );
}
