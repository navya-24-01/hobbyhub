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
  const [loginError, setLoginError] = useState('Please sign in with your email and password')
  const [signupError, setSignUpError] = useState('Please sign up with a valid email and a 6 character password')
  

  async function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSignUpError("An email containing the verification link was sent to your mail.")
      })
      .catch((error) => {
        console.log(error)
        setSignUpError(error.message)
      });
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in");
      setLoginError("Login Succesful!")
      return true; // If login is successful, return true.
    } catch (error) {
      setLoginError(error.message)
      console.error(error.message);
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
    loginError,
    signupError,
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