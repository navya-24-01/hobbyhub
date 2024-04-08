import React, { useState } from "react";
import Navbar from "./Navbar"; // Ensure the path to Navbar is correct
import "./styles.css";
import { Link } from "react-router-dom";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState({});

  const handleLike = (index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const listings = [
    {
      title: "High-Performance Ski Board",
      description:
        "Hit the slopes with our top-of-the-line ski boards, perfect for all skill levels.",
      imageUrl: "https://source.unsplash.com/featured/?ski",
      price: "$40/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      title: "Mountain Bike Rental",
      description:
        "Explore the trails with our durable and reliable mountain bikes, suitable for various terrains.",
      imageUrl: "https://source.unsplash.com/featured/?mountainbike",
      price: "$30/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      title: "Complete Hiking Gear Set",
      description:
        "Get ready for the outdoors with our comprehensive hiking gear set, including backpack, tent, and navigation tools.",
      imageUrl: "https://source.unsplash.com/featured/?hiking",
      price: "$50/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      title: "Professional Camera Equipment",
      description:
        "Capture your moments with high-quality camera gear, perfect for photography enthusiasts and professionals.",
      imageUrl: "https://source.unsplash.com/featured/?camera",
      price: "$70/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      title: "Camping Tent for Two",
      description:
        "Enjoy a night under the stars with our spacious and comfortable camping tents, ideal for a couple's getaway.",
      imageUrl: "https://source.unsplash.com/featured/?camping",
      price: "$25/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
      title: "Ocean Kayak Adventure",
      description:
        "Paddle through the waves with our stable and easy-to-navigate ocean kayaks, great for explorers of all levels.",
      imageUrl: "https://source.unsplash.com/featured/?kayak",
      price: "$45/day",
      user: "John Doe",
      userProfilePic: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

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
                    <div className="col-lg-4 mb-5" key={index}>
                      <div className="card lift h-100">
                        <img
                          src={listing.imageUrl}
                          className="card-img-top"
                          alt={listing.title}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{listing.title}</h5>
                          <p className="card-text">{listing.description}</p>
                          <div className="user-info mb-2">
                            <img
                              src={listing.userProfilePic}
                              alt={listing.user}
                              style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                            />
                            <span className="ms-2">{listing.user}</span>
                          </div>
                          <p className="fw-bold">{listing.price}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to="/chat" className="btn btn-primary">
                              Chat Now
                            </Link>
                            <button
                              onClick={() => handleLike(index)}
                              className={`btn ${
                                likes[index]
                                  ? "btn-danger"
                                  : "btn-outline-danger"
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
