import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import "./styles.css";

function ListingDetails() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

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
              <div className="listing-actions">
                <Link to="/chat" className="btn primary-action">
                  Chat Now with Seller
                </Link>
                <button className="btn secondary-action">Pay Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingDetails;
