import React, { useEffect, useState } from "react";
import { db } from "../../Config/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Navbar from "./Navbar";
import { useAuth } from "../../Context/AuthorizationContext";
import "./styles.css";

function ReviewsReceived() {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      if (!currentUser) {
        console.log("No current user, aborting fetch");
        return;
      }
      const reviewsRef = collection(db, "reviews");
      const q = query(reviewsRef, where("renterId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const reviewsData = [];

      for (const doc of querySnapshot.docs) {
        const reviewData = doc.data();
        const listingDetails = await getListingDetails(reviewData.listingId);
        const renteeDetails = await getRenteeDetails(reviewData.renteeId);

        reviewsData.push({
          id: doc.id,
          ...reviewData,
          listingDetails,
          renteeDetails,
        });
      }

      setReviews(reviewsData);
    };

    fetchReviews();
  }, [currentUser]);

  const getListingDetails = async (listingDetails) => {
    // Check if listingDetails is valid
    if (!listingDetails) {
      console.log("Listing details are undefined or invalid.");
      return null;
    }
    // Since listingDetails already contains all needed information, just return it
    return listingDetails;
  };

  const getRenteeDetails = async (renteeId) => {
    if (!renteeId) {
      console.log("Rentee ID is undefined or invalid:", renteeId);
      return null;
    }
    const docRef = doc(db, "user", renteeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  return (
    <div>
      <Navbar />
      <div className="listing-details-container">
        <h1>Reviews Received</h1>

        <div className="listing-container">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div>
                  <strong>Rating:</strong> {review.rating}
                </div>
                <div>
                  <strong>Description:</strong> {review.description}
                </div>
                {review.listingDetails && (
                  <div>
                    <div className="listing-image-container">
                      <img
                        src={
                          review.listingDetails.url ||
                          "https://source.unsplash.com/featured/?hobby"
                        }
                        alt={review.listingDetails.title}
                        className="listing-image"
                      />
                    </div>
                    <div className="listing-info">
                      <h2>{review.listingDetails.title}</h2>
                      <p>
                        <strong>Category:</strong>{" "}
                        {review.listingDetails.category}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {review.listingDetails.description}
                      </p>
                      <p>
                        <strong>Condition:</strong>{" "}
                        {review.listingDetails.condition}
                      </p>
                      <p>
                        <strong>Hourly Rate:</strong> $
                        {review.listingDetails.hourlyrate}
                      </p>
                      <p>
                        <strong>Seller:</strong>{" "}
                        {review.listingDetails.sellerName}
                      </p>
                    </div>
                  </div>
                )}
                {review.renteeDetails && (
                  <div>
                    <strong>Rentee Name:</strong>{" "}
                    {review.renteeDetails.username}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewsReceived;
