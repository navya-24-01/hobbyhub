import React, { useContext, useState, createContext } from "react";
import { useAuth } from "./AuthorizationContext.js";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../Config/firebase.js";

export const ProfileContext = createContext();

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [messageProfile, setMessageProfile] = useState();

  async function checkUserExists() {
    const userref = doc(db, "user", currentUser.uid);
    const user = await getDoc(userref);
    console.log("checkuserexists");
    if (!user.exists()) {
      return false;
    } else {
      return true;
    }
  }

  async function setUser(profileData) {
    setLoading(true);
    try {
      // Check if the currentUser is not null
      if (currentUser) {
        // Include the user's ID in the listing data
        const profileWithUserID = {
          ...profileData,
          userid: currentUser.uid,
          useremail : currentUser.email
        };

        const docRef = await setDoc(doc(db, "user", currentUser.uid), profileWithUserID); // Make sure the collection name is correct
        console.log("Profile created with ID: ", docRef.id);
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
    setUser,
    checkUserExists,
    loading,
    setLoading,
  };

  return (
    <ProfileContext.Provider value={value}>
      {!loading && children}
    </ProfileContext.Provider>
  );
}
