import React, { useContext, useState, useEffect, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Config/firebase.js";


export const AuthorizationContext = createContext();

export function useAuth() {
  return useContext(AuthorizationContext);
}

export function AuthorizationProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
      });
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
      return true; // If login is successful, return true.
    } catch (error) {
      console.error(error);
      return false; // If an error occurs, return false.
    }
  }

  async function logout() {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthorizationContext.Provider value={value}>
      {!loading && children}
    </AuthorizationContext.Provider>
  );
}