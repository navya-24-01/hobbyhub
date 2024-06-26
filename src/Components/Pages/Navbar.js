import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
      <div class="container px-5">
        <a class="navbar-brand text-primary" href="index.html">
          Hobby Hub
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i data-feather="menu"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto me-lg-5">
            <li class="nav-item dropdown dropdown-xl no-caret">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownPages"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                HobbyMarket
                <i class="fas fa-chevron-right dropdown-arrow"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-end me-lg-n20 me-xl-n15 animated--fade-in-up"
                aria-labelledby="navbarDropdownPages"
              >
                <div class="row g-0">
                  <div class="col-lg-4 p-lg-5">
                    <h6 class="dropdown-header text-primary">
                      Seller's Market
                    </h6>
                    <a class="dropdown-item" href="./createlisting">
                      Create A Listing
                    </a>
                    <a class="dropdown-item" href="./seller-listings">
                      View My Listings
                    </a>
                    <a class="dropdown-item" href="/ReviewsReceived">
                      View My Reviews
                    </a>
                    <a class="dropdown-item" href="/PaymentsReceived">
                      View Payments I have Received
                    </a>

                    <div class="dropdown-divider border-0"></div>
                  </div>
                  <div class="col-lg-4 p-lg-5">
                    <h6 class="dropdown-header text-primary">Buyer's Market</h6>
                    <a class="dropdown-item" href="./rentedlistings">
                      View Stuff I have Rented
                    </a>
                    <a class="dropdown-item" href="./listings">
                      Explore Listings
                    </a>

                    <div class="dropdown-divider border-0"></div>
                  </div>
                  <div class="col-lg-4 p-lg-5">
                    <h6 class="dropdown-header text-primary">
                      Customer Service
                    </h6>
                    <a class="dropdown-item" href="/complaint">
                      Make A Complain
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item dropdown no-caret">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownDocs"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                HobbyBlog
                <i class="fas fa-chevron-right dropdown-arrow"></i>
              </a>

              <div
                class="dropdown-menu dropdown-menu-end animated--fade-in-up"
                aria-labelledby="navbarDropdownDocs"
              >
                <div class>
                  <div class>
                    <h6 class="dropdown-header text-primary">Blogs</h6>
                    <a class="dropdown-item" href="./allBlogs">
                      Explore Blogs
                    </a>
                    <a class="dropdown-item" href="./myBlog">
                      My Blogs
                    </a>
                    <a class="dropdown-item" href="./writeBlog">
                      Write Blog
                    </a>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item dropdown no-caret">
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownDocs"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                My Profile
                <i class="fas fa-chevron-right dropdown-arrow"></i>
              </a>

              <div
                class="dropdown-menu dropdown-menu-end animated--fade-in-up"
                aria-labelledby="navbarDropdownDocs"
              >
                <a class="dropdown-item" href="./profile">
                  Edit My Profile
                </a>
                <a class="dropdown-item" href="./conversations">
                  View My Conversations
                </a>

                <div class="dropdown-divider m-0"></div>

                <a class="dropdown-item" href="./signin">
                  Logout
                </a>
              </div>
            </li>
            <button onClick={() => navigate(-1)} className="btn btn-primary">
              Back
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
