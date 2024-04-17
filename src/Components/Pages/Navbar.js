import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Navbar() {
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
                id="navbarDropdownDemos"
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
                class="dropdown-menu dropdown-menu-end animated--fade-in-up me-lg-n25 me-xl-n15"
                aria-labelledby="navbarDropdownDemos"
              >
                <div class="row g-0">
                  <div
                    class="col-lg-5 p-lg-3 bg-img-cover overlay overlay-primary overlay-70 d-none d-lg-block"
                    style={{
                      backgroundImage:
                        "url('assets/img/backgrounds/bg-dropdown-xl.jpg')",
                    }}
                  >
                    <div class="d-flex h-100 w-100 align-items-center justify-content-center">
                      <div class="text-white text-center z-1">
                        <div class="mb-3">
                          Multipurpose landing pages for a variety of projects.
                        </div>
                        <a
                          class="btn btn-white btn-sm text-primary fw-500"
                          href="index.html"
                        >
                          View All
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7 p-lg-5">
                    <div class="row">
                      <div class="col-lg-6">
                        <h6 class="dropdown-header text-primary">
                          Communities
                        </h6>
                        <a class="dropdown-item" href="landing-app-mobile.html">
                          Explore Communities
                        </a>
                        <a
                          class="dropdown-item"
                          href="landing-app-desktop.html"
                        >
                          My Communities
                        </a>
                        <a
                          class="dropdown-item"
                          href="landing-app-desktop.html"
                        >
                          Create Community
                        </a>
                        <a
                          class="dropdown-item"
                          href="landing-app-desktop.html"
                        >
                          Communities I created
                        </a>
                        <div class="dropdown-divider border-0"></div>
                      </div>
                      <div class="col-lg-6">
                        <h6 class="dropdown-header text-primary">Blogs</h6>
                        <a class="dropdown-item" href="./allBlogs">
                          Explore Blogs
                        </a>
                        <a class="dropdown-item" href="./MyBlog">
                          My Blogs
                        </a>
                        <a class="dropdown-item" href="./writeBlog">
                          Write Blog
                        </a>
                        <a class="dropdown-item" href="landing-press.html">
                          Favourites
                        </a>
                        <a class="dropdown-item" href="landing-press.html">
                          My Activity
                        </a>
                        <div class="dropdown-divider border-0 d-lg-none"></div>
                      </div>
                      <div class="col-lg-6">
                        <h6 class="dropdown-header text-primary">
                          Conversations
                        </h6>
                        <a class="dropdown-item" href="landing-app-mobile.html">
                          View Conversations
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
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
                    <a class="dropdown-item" href="./rentedlistings">
                      View My Rented Stuff
                    </a>
                    <a class="dropdown-item" href="page-company-team.html">
                      View My Reviews
                    </a>
                    <a class="dropdown-item" href="page-company-team.html">
                      View Payments I have Received
                    </a>
                    <a class="dropdown-item" href="page-company-team.html">
                      View Conversations with Buyers
                    </a>
                    <div class="dropdown-divider border-0"></div>
                  </div>
                  <div class="col-lg-4 p-lg-5">
                    <h6 class="dropdown-header text-primary">Buyer's Market</h6>
                    <a class="dropdown-item" href="page-help-center.html">
                      View Stuff I have Rented
                    </a>
                    <a class="dropdown-item" href="./listings">
                      Explore Listings
                    </a>
                    <a
                      class="dropdown-item"
                      href="page-help-knowledgebase.html"
                    >
                      View Payments I have made
                    </a>
                    <a
                      class="dropdown-item"
                      href="page-help-message-center.html"
                    >
                      View Reviews I have Written
                    </a>
                    <a
                      class="dropdown-item"
                      href="page-help-support-ticket.html"
                    >
                      View Conversations With Sellers
                    </a>
                    <div class="dropdown-divider border-0"></div>
                  </div>
                  <div class="col-lg-4 p-lg-5">
                    <h6 class="dropdown-header text-primary">
                      Customer Service
                    </h6>
                    <a class="dropdown-item" href="/complaint">
                      Make A Complaint
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

                <div class="dropdown-divider m-0"></div>


                <a class="dropdown-item" href="./signin">
                  Logout
                </a>

              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;