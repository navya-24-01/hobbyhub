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
  const id  = conversationId;
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");
  const [messages, setMessages] = useState([]);
  const { currentUser } = useAuth(); 

  useEffect(() => {
    console.log(id)
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
      console.log(messages)
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [id, setMessages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage === "") {
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
};
