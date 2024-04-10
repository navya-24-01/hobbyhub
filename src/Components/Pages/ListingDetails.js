import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import "./styles.css";
import PayPalButton from './PayPalButton';
import { useAuth } from "../../Context/AuthorizationContext";
import { useConversations } from "../../Context/ConversationsContext";

function ListingDetails() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const {currentUser} = useAuth();
  const{createConversation} = useConversations();
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchListing();
  }, [listingId]);

  function ListingDetails() {
    // Other state and useEffect hooks
  
    const navigate = useNavigate(); // Get the navigate function
  
   
  
    // Your component JSX
  }
  const handleChatNowClick = async () => {
    // Assume you have the current user and the listing information
    if (!currentUser) {
      alert("Please log in to chat with the seller.");
      return;
    }
    console.log(currentUser.uid)
    console.log(listing.seller)
    // Your existing logic to create a conversation...
    const conversationId = await createConversation({
      user1Id: currentUser.uid,
      user2Id: listing.seller, // Assuming you have sellerId in the listing object
    });

    // Use the navigate function with the conversationId
    if (conversationId) {
      navigate(`/chat/${conversationId}`);
    } else {
      alert("Could not start a conversation. Please try again later.");
    }
  };

  const handlePayNowClick = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates with times.");
      return;
    }
  
    console.log("Start Date String:", startDate);
    console.log("End Date String:", endDate);
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    console.log("Start Date Object:", start);
    console.log("End Date Object:", end);
  
    const hours = Math.abs(end - start) / 36e5; // Convert milliseconds to hours
  
    console.log("Calculated Hours:", hours);
  
    if (hours > 0) {
      const total = hours * parseFloat(listing.hourlyrate); // Calculate total amount
      console.log("Total Amount:", total);
      setTotalAmount(total); // Update total amount for payment
      setShowPayPal(true); // Show PayPal Button
    } else {
      alert("End date and time must be after the start date and time.");
      setShowPayPal(false); // Hide PayPal button if input is invalid
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="listing-details-container">
        {listing && (
          <div>
            <div className="listing-image-container">
              <img
                src={
                  listing.url || "https://source.unsplash.com/featured/?hobby"
                }
                alt={listing.title}
                className="listing-image"
              />
            </div>
            <div className="listing-info">
              <h2>{listing.title}</h2>
              <p>
                <strong>Category:</strong> {listing.category}
              </p>
              <p>
                <strong>Description:</strong> {listing.description}
              </p>
              <p>
                <strong>Condition:</strong> {listing.condition}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${listing.hourlyrate}
              </p>
              <p>
                <strong>Seller:</strong> {listing.sellerName}
              </p>
              <p>
                <strong>Rental Period:</strong> 
              </p>
              <div className="date-selection">
                <input 
                  type="datetime-local" 
                  value={startDate} 
                  onChange={e => setStartDate(e.target.value)} 
                />
                <input 
                  type="datetime-local" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                />
              </div>

              <div className="listing-actions">
              <button onClick={handleChatNowClick} className="btn primary-action">
                Chat Now with Seller
              </button>
                <button onClick={handlePayNowClick} className="btn secondary-action">
                Pay Now
              </button>
              {showPayPal && (
                <PayPalButton 
                  description={listing.title} 
                  amount={totalAmount} // Ensure hourlyrate is a valid number
                />
              )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingDetails;