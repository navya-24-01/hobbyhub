import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useAuth } from "../../Context/AuthorizationContext";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const { conversationId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const usersRef = collection(db, "user");
    onSnapshot(usersRef, (snapshot) => {
      const loadedUsernames = {};
      snapshot.docs.forEach((doc) => {
        loadedUsernames[doc.id] = doc.data().username;
      });
      setUsernames(loadedUsernames);
    });
  }, []);

  useEffect(() => {
    const messagesRef = collection(db, "conversations", conversationId, "messages");
    const q = query(messagesRef, orderBy("createdAt"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = collection(db, "conversations", conversationId, "messages");
    try {
      const docRef = await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: currentUser.uid,
      });
      console.log("Message sent with ID:", docRef.id);
      setNewMessage("");
    } catch (error) {
      console.error("Error adding message to the database:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: "400px", width: '100%', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 180px)', padding: '10px' }}>
          {messages.map((message) => (
            <div key={message.id} style={{
              display: "flex",
              justifyContent: message.user === currentUser.uid ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}>
              <div style={{
                background: message.user === currentUser.uid ? "#dcf8c6" : "#e5e5ea",
                color: "#000",
                borderRadius: "20px",
                padding: "10px",
                maxWidth: "70%",
                boxShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
              }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {usernames[message.user] || "Anonymous"}
                </p>
                <p style={{ margin: "5px 0" }}>{message.text}</p>
                <p style={{ fontSize: "0.8em", color: "#555", margin: 0, textAlign: "right" }}>
                  {message.createdAt?.toDate().toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '10px' }}>
          <input
            style={{
              flex: 1,
              marginRight: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "20px",
            }}
            placeholder="Enter your message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;


/*Merge branch 'main' of https://github.com/navya-24-01/hobbyhub
81741d2
src/Components/Pages/Chat.js
@@ -0,0 +1,98 @@
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useAuth } from "../../Context/AuthorizationContext";
import { useParams } from "react-router-dom";

export const Chat = () => {
  const { conversationId } = useParams();
  const id = conversationId;
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(id);
    const queryMessages = query(
      messageRef,
      where("id", "==", id),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [id, setMessages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") {
      console.error("Message is empty.");
      return;
    }

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: currentUser.uid,
      id,
    });

    setNewMessage("");
  };

  // JSX for the chat component goes here


  return (
    <div>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <div style={{ margin: "20px 0" }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                border: "1px solid #1976d2",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "10px",
              }}
            >
              <h2 style={{ textAlign: "center", fontFamily: "Boogaloo" }}>
                {message.user}
              </h2>
              <p style={{ textAlign: "center", fontFamily: "Pakaud" }}>
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <form onSubmit={handleSubmit} className="new-message-form">
            <input
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              className="new-message-input"
              placeholder="Enter your message"
              onChange={(event) => setNewMessage(event.target.value)}
              value={newMessage}
            />
            <button type="submit" style={{ padding: "10px 20px", border: "1px solid #1976d2", borderRadius: "4px", cursor: "pointer" }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}; */