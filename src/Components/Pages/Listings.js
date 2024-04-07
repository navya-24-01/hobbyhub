import React from "react";
//import Navbar from "./Navbar";
import "./styles.css";
import { Link } from "react-router-dom";
//import LoginModal from "./LoginModal";

export default function WelcomePage() {
  // Dummy data for listings
  const listings = [
    {
      title: "Cozy Countryside Cottage",
      description: "A charming cottage in the peaceful countryside.",
      imageUrl: "https://source.unsplash.com/random/800x600",
      price: "$100/night",
    },
    {
      title: "Modern Apartment in the City",
      description:
        "Enjoy the city life in this modern and comfortable apartment.",
      imageUrl: "https://source.unsplash.com/random/800x601",
      price: "$150/night",
    },
    {
      title: "Beachfront Villa",
      description:
        "Wake up to the sound of waves in this stunning beachfront villa.",
      imageUrl: "https://source.unsplash.com/random/800x602",
      price: "$250/night",
    },
  ];

  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          {/* Existing header and content */}
          <header className="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            {/* Header content */}
          </header>

          {/* Listings section */}
          <section className="bg-white py-10">
            <div className="container px-5">
              <h2 className="text-center mb-5">Explore Our Listings</h2>
              <div className="row gx-5">
                {listings.map((listing, index) => (
                  <div className="col-lg-4 mb-5" key={index}>
                    <div className="card lift h-100">
                      <img
                        src={listing.imageUrl}
                        className="card-img-top"
                        alt={listing.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{listing.title}</h5>
                        <p className="card-text">{listing.description}</p>
                        <p className="fw-bold">{listing.price}</p>
                        <Link to="#" className="btn btn-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer section */}
          <div id="layoutDefault_footer">{/* Footer content */}</div>
        </main>
      </div>
    </div>
  );
}
