import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useAuth } from "../../Context/AuthorizationContext";
import Navbar from "./Navbar";

const ConversationsPage = () => {
  const { currentUser } = useAuth();
  const [conversationDetails, setConversationDetails] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchConversations = async () => {
      if (!currentUser.uid) {
        console.error("Invalid UID:", currentUser.uid);
        return;
      }
      const userRef = doc(db, "user", currentUser.uid); // Corrected "user" to "users" if that's the correct collection
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { conversationIds } = userSnap.data();
        if (conversationIds) {
          fetchConversationDetails(conversationIds);
        } else {
          console.error("User has no conversationIds:", currentUser.uid);
        }
      } else {
        console.error("No such user document!");
      }
    };

    const fetchConversationDetails = async (conversationIds) => {
      const details = await Promise.all(conversationIds.map(async (id) => {
        if (!id) {
          console.error("Invalid conversation ID:", id);
          return null; // Skip this iteration
        }
        const conversationRef = doc(db, "conversations", id);
        const conversationSnap = await getDoc(conversationRef);

        if (conversationSnap.exists()) {
          const { user1Id, user2Id, lastText } = conversationSnap.data();
          const otherUserId = user1Id === currentUser.uid ? user2Id : user1Id;
          if (!otherUserId) {
            console.error("Invalid otherUserId:", otherUserId);
            return null; // Skip this iteration
          }
          const otherUserRef = doc(db, "user", otherUserId);
          const otherUserSnap = await getDoc(otherUserRef);

          if (otherUserSnap.exists()) {
            return {
              lastText : lastText || "No messages yet",
              conversationId: id,
              userData: otherUserSnap.data()
            };
          }
        }
        return null; // Handle non-existing user or conversation
      }));

      setConversationDetails(details.filter(detail => detail)); // Filter out any null values
    };

    fetchConversations();
  }, [currentUser]);

  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          <Navbar />
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div className="page-header-ui-content pt-10">
              <div className="container px-5 text-center">
                <div className="row gx-5 justify-content-center">
                  <div className="col-lg-8">
                    <h1 className="page-header-ui-title mb-3">My Conversations</h1>
                    <p className="page-header-ui-text">
                      Talk to potential renters and rentees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <section className="bg-white py-10">
            <div className="container px-5">
              <div className="row gx-5">
                {conversationDetails.map(({ conversationId, userData, lastText }) => (
                  <div className="col-md-6 col-xl-4 mb-5" key={conversationId}>
                    <div className="card card-team">
                      <div className="card-body">
                        <img
                          className="card-team-img mb-3"
                          src={userData.profilepic || "/default-profile.jpg"}
                          alt={`${userData.username || 'User'}'s profile pic`}
                        />
                        <div className="card-team-name">
                          {userData.username || 'Unknown User'}
                        </div>
                        <p className="small mb-0">
                         {lastText}
                        </p>
                      </div>
                      <div className="card-footer text-center">
                        <Link to={`/chat/${conversationId}`} className="btn btn-primary">
                          Chat Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ConversationsPage;
