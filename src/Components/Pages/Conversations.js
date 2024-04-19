// ConversationsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useAuth } from "../../Context/AuthorizationContext";
import Navbar from "./Navbar";

const ConversationsPage = () => {
  const [conversations, setConversations] = useState([]);
  const { currentUser } = useAuth(); // Get the current user from context
  const [conversationUsers, setConversationUsers] = useState({});

  useEffect(() => {
    if (!currentUser) return; // Guard clause if currentUser is not available

    const fetchConversations = async () => {

      const fetchConversationUsers = async (conversationIds) => {
        const users = {};
        for (const id of conversationIds) {
          const userRef = doc(db, "users", id); // Assuming the collection is named "users"
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            users[id] = userSnap.data(); // Store user data by conversation id
          }
        }
        setConversationUsers(users);
      };
      const userRef = doc(db, "user", currentUser.uid); // Use uid from currentUser
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const { conversationIds } = userSnap.data();
        setConversations(conversationIds);
        fetchConversationUsers(conversationIds); // Assuming conversationIds are stored in user's document
      } else {
        console.log("No such document!");
      }
    };

    fetchConversations();
  }, [currentUser]); // Depend on currentUser to re-run effect when it changes

  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          <Navbar />
          <header class="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div class="page-header-ui-content pt-10">
              <div class="container px-5 text-center">
                <div class="row gx-5 justify-content-center">
                  <div class="col-lg-8">
                    <h1 class="page-header-ui-title mb-3">My Conversations</h1>
                    <p class="page-header-ui-text">
                      Talk to potential renters and rentees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="svg-border-rounded text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 144.54 17.34"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path>
              </svg>
            </div>
          </header>
          <section class="bg-white py-10">
            <div class="container px-5">
              <div class="row gx-5">
                {conversations.map((conversationId) => {
                  const userData =  conversationUsers[conversationId];
                  return (
                   <div class="col-md-6 col-xl-4 mb-5">
                   <div class="card card-team">
                     <div class="card-body">
                       {userData && (
                         <img
                           class="card-team-img mb-3"
                           src={userData.profilepic}
                           alt={`${userData.username}'s profile pic`}
                         />
                       )}
                       <div class="card-team-name">
                         {userData ? userData.username : 'Loading...'}
                       </div>
                      <p class="small mb-0">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                    <div class="card-footer text-center">
                      
                      <Link to={`/chat/${conversationId}`} className="btn btn-primary">
                            Chat Now
                          </Link>
                      
                      
                    </div>
                  </div>
                  </div>
                )})}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ConversationsPage;
