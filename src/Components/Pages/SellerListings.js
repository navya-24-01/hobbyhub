import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Ensure this is the correct path
import "./styles.css";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../Context/AuthorizationContext";

function SellerListings() {
  const [listings, setListings] = useState([]);
  const { currentUser } = useAuth(); // Get current user

  useEffect(() => {
    const fetchSellerListings = async () => {
      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userListingIds = userData.userslistings || [];
        const listingsData = [];

        for (const listingId of userListingIds) {
          const listingRef = doc(db, "listings", listingId);
          const listingSnap = await getDoc(listingRef);

          if (listingSnap.exists()) {
            listingsData.push({ id: listingSnap.id, ...listingSnap.data() });
          }
        }

        setListings(listingsData);
      } else {
        console.log("No such user document!");
      }
    };

    fetchSellerListings();
  }, [currentUser]);

  return (
    <div id="layoutDefault">
      <Navbar />
      <div id="layoutDefault_content">
        <main>
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div className="container px-5 text-center">
              <h1 className="page-header-ui-title mb-3">My Rental Listings</h1>
              <p className="page-header-ui-text mb-4">
                Your posted rental items.
              </p>
            </div>
          </header>

          <section className="bg-white py-10">
            <div className="container px-5">
              <h2 className="text-center mb-5">Your Listed Items</h2>
              <div className="row gx-5">
                {listings.length > 0 ? (
                  listings.map((listing) => (
                    <div className="col-lg-4 mb-5" key={listing.id}>
                      <Link
                        to={`/listing/${listing.id}`}
                        className="card lift h-100"
                      >
                        <img
                          src={
                            listing.url ||
                            "https://source.unsplash.com/featured/?hobby"
                          }
                          className="card-img-top"
                          alt={listing.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{listing.title}</h5>
                          <p className="card-text">{listing.description}</p>
                          <p className="fw-bold">${listing.hourlyrate}/hour</p>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No listings found.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <div id="layoutDefault_footer"></div>
        </main>
      </div>
    </div>
  );
}

export default SellerListings;
