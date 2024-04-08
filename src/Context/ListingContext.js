import React, { useContext, useState, createContext} from "react";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Config/firebase.js";
import { useAuth } from "./AuthorizationContext.js"; // Import the useAuth hook

export const ListingContext = createContext();

export function useListing() {
  return useContext(ListingContext);
}

export function ListingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function createListing(listingData) {
    setLoading(true);
    try {
      
      if (currentUser) {
        
        const listingWithUserID = {
          ...listingData,
          seller: currentUser.uid, 
        }
        const docRef = await addDoc(
          collection(db, "listings"),
          listingWithUserID
        ); // Make sure the collection name is correct
        const listingid = docRef.id;

        const userRef = doc(db, "user", currentUser.uid);
        await updateDoc(userRef, {
          userslistings: arrayUnion(listingid),
        });
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
    loading,
  };

  return (
    <ListingContext.Provider value={value}>
      {!loading && children}
    </ListingContext.Provider>
  );
}
