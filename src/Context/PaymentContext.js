import React, { useContext, useState, createContext } from "react";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../Config/firebase";
import { useAuth } from "./AuthorizationContext";

export const PaymentContext = createContext();

export function usePayment() {
  return useContext(PaymentContext);
}

export function PaymentProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function createPayment(paymentData) {
    setLoading(true);
    try {
      if (!currentUser) {
        throw new Error("No user is currently logged in.");
      }

      // Add the payment to the 'payments' collection
      const docRef = await addDoc(collection(db, "payments"), paymentData);
      const paymentId = docRef.id;

      // Update the user's document with the new paymentId
      const userRef = doc(db, "user", currentUser.uid);
      await updateDoc(userRef, {
        paymentsMade: arrayUnion(paymentId),
      });

      setLoading(false);
      return paymentId;

    } catch (error) {
      console.error("Error creating payment record: ", error);
      setLoading(false);
      return null;
    }
  }

  const value = {
    createPayment,
    loading,
  };

  return (
    <PaymentContext.Provider value={value}>
      {!loading && children}
    </PaymentContext.Provider>
  );
}
