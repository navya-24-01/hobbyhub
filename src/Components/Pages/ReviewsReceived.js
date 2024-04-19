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
      const reviewsData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const reviewData = doc.data();
          const listingDetails = await getListingDetails(reviewData.listingId);
          const renteeDetails = await getRenteeDetails(reviewData.renteeId);

          return {
            id: doc.id,
            ...reviewData,
            listingDetails,
            renteeDetails,
          };
        })
      );

      setReviews(reviewsData);
    };

    fetchReviews();
  }, [currentUser]);

  const getListingDetails = async (listingDetails) => {
    if (!listingDetails) {
      console.log("Listing details are undefined or invalid.");
      return null;
    }
    return listingDetails;
  };

  async function getRenteeDetails(renteeId) {
    if (!renteeId) {
      console.log("Rentee ID is undefined or invalid:", renteeId);
      return null;
    }
    const docRef = doc(db, "user", renteeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "active" : "inactive"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div>
      <Navbar />
      <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
        <div className="container px-5 text-center">
          <h1 className="page-header-ui-title mb-3">Reviews Received</h1>
          <p className="page-header-ui-text mb-4">
            Explore feedback from your renters.
          </p>
        </div>
      </header>
      <section className="bg-white py-10">
        <div className="container px-5">
          <h2 className="text-center mb-5">Review Details</h2>
          <div className="row gx-5">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="col-lg-6 mb-5" key={review.id}>
                  <div className="card lift h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        Review by: {review.renteeDetails.username}
                      </h5>
                      <div>
                        <strong>Rating:</strong> {renderStars(review.rating)}
                      </div>
                      <p>
                        <strong>Description:</strong> {review.description}
                      </p>
                      {review.listingDetails && (
                        <>
                          <hr />
                          <h5 className="card-title">
                            {review.listingDetails.title}
                          </h5>
                          <p>
                            <strong>Category:</strong>{" "}
                            {review.listingDetails.category}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {review.listingDetails.description}
                          </p>
                          {review.listingDetails.url && (
                            <img
                              src={review.listingDetails.url}
                              alt="Listing"
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-100">
                <p>No reviews found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReviewsReceived;
