import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import { Link } from "react-router-dom";
import { db } from "../../Config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState({});
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsCollection = collection(db, "listings");
      const listingsSnapshot = await getDocs(listingsCollection);
      const listingsList = [];

      for (const listingDoc of listingsSnapshot.docs) {
        const listingData = listingDoc.data();
        const userRef = doc(db, "users", listingData.seller);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          listingsList.push({
            id: listingDoc.id,
            ...listingData,
            sellerUID: userData.UID || listingData.seller,
          });
        } else {
          listingsList.push({
            id: listingDoc.id,
            ...listingData,
          });
        }
      }

      setListings(listingsList);
    };

    fetchListings();
  }, []);

  const handleLike = (index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="layoutDefault">
      <Navbar />
      <div id="layoutDefault_content">
        <main>
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div className="container px-5 text-center">
              <h1 className="page-header-ui-title mb-3">
                Welcome to The HobbyMarket
              </h1>
              <p className="page-header-ui-text mb-4">
                A community-driven marketplace to rent out and explore spare
                equipment for your new hobby.
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ maxWidth: "300px", margin: "0 auto" }}
              />
            </div>
          </header>

          <section className="bg-white py-10">
            <div className="container px-5">
              <h2 className="text-center mb-5">Explore Rental Items</h2>
              <div className="row gx-5">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing, index) => (
                    <div className="col-lg-4 mb-5" key={listing.id}>
                      <Link
                        to={`/listing/${listing.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="card lift h-100">
                          <img
                            src={
                              listing.url ||
                              "https://source.unsplash.com/featured/?hobby"
                            }
                            className="card-img-top"
                            alt={listing.title}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{listing.title}</h5>
                            <p className="card-text">{listing.description}</p>
                            <div className="user-info mb-2">
                              <span className="ms-2">{listing.sellerUID}</span>
                            </div>
                            <p className="fw-bold">
                              ${listing.hourlyrate}/hour
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="card-footer">
                        <button
                          onClick={() => handleLike(index)}
                          className={`btn ${
                            likes[index] ? "btn-danger" : "btn-outline-danger"
                          }`}
                          style={{ border: "none" }}
                        >
                          <i
                            className={`${
                              likes[index] ? "fas fa-heart" : "far fa-heart"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No results found.</p>
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
