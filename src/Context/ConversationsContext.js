import React, { useContext, useState, createContext } from "react";
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp,
  getDocs,
  query,
  where 
} from "firebase/firestore";
import { db } from "../Config/firebase";
import { useAuth } from "./AuthorizationContext"; // Assuming you have an Auth context for current user

export const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  async function createConversation(conversationData) {
    setLoading(true);
    try {
      if (currentUser) {
        const { user1Id, user2Id } = conversationData;
        
        // Query to check if a conversation between the two users already exists
        const conversationsRef = collection(db, "conversations");
        const q = query(conversationsRef, 
                        where("user1Id", "in", [user1Id, user2Id]), 
                        where("user2Id", "in", [user1Id, user2Id]));
        const querySnapshot = await getDocs(q);

        // Check if we have results
        if (!querySnapshot.empty) {
          // Assuming the first matching conversation is the one we're interested in
          const existingConversation = querySnapshot.docs[0];
          setLoading(false);
          return existingConversation.id; // Return existing conversation ID
        }

        // No existing conversation found; proceed to create a new one
        const conversationWithTimestamp = {
          ...conversationData,
          updatedAt: serverTimestamp(),
          lastText: "No messages"
        };

        const conversationRef = await addDoc(conversationsRef, conversationWithTimestamp);
        const conversationId = conversationRef.id;

        // Update conversation list for both users
        const user1Ref = doc(db, "user", user1Id); // Corrected "user" to "users"
        const user2Ref = doc(db, "user", user2Id); // Corrected "user" to "users"

        await updateDoc(user1Ref, {
          conversationIds: arrayUnion(conversationId),
        });
        await updateDoc(user2Ref, {
          conversationIds: arrayUnion(conversationId),
        });

        setLoading(false);
        return conversationId; // Return new conversation ID
      } else {
        throw new Error("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error creating or retrieving conversation: ", error);
      setLoading(false);
      return null;
    }
  }

  const value = {
    createConversation,
    loading,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {!loading && children}
    </ConversationsContext.Provider>
  );
}
