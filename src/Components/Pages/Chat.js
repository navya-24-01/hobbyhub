


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