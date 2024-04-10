// ConversationsPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import { useAuth } from '../../Context/AuthorizationContext';

const ConversationsPage = () => {
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useAuth(); // Get the current user from context

  useEffect(() => {
    if (!currentUser) return; // Guard clause if currentUser is not available

    const fetchConversations = async () => {
      const userRef = doc(db, 'user', currentUser.uid); // Use uid from currentUser
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { conversationIds } = userSnap.data();
        setConversations(conversationIds); // Assuming conversationIds are stored in user's document
      } else {
        console.log('No such document!');
      }
    };

    fetchConversations();
  }, [currentUser]); // Depend on currentUser to re-run effect when it changes

  return (
    <div>
      <h2>Your Conversations</h2>
      <ul>
        {conversations.map((conversationId) => (
          <li key={conversationId}>
            
            <Link to={`/chat/${conversationId}`}>Conversation {conversationId}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationsPage;
