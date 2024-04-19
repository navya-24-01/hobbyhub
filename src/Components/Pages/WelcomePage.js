import Navbar from "./Navbar";
import "./styles.css";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          <header class="page-header-ui page-header-ui-dark bg-gradient-primary-to-secondary">
            <div class="page-header-ui-content">
              <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                  <div class="col-xl-8 col-lg-10 text-center">
                    <h1 class="page-header-ui-title">HobbyHub</h1>
                    <p class="page-header-ui-text mb-5">Welcome to HobbyHub!</p>
                    <a class="btn fw-500 btn-teal me-2" href="./signin">
                      Sign In
                      <i class="ms-2" data-feather="arrow-right"></i>
                    </a>
                    <a class="btn btn-link fw-500" href="./signup">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="svg-border-angled text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <polygon points="0,100 100,0 100,100"></polygon>
              </svg>
            </div>
          </header>
          <section class="bg-white py-10">
            <div class="container px-5">
              <div class="row gx-5 text-center">
                <div class="col-lg-4 mb-5 mb-lg-0">
                  <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                    <i data-feather="layers"></i>
                  </div>
                  <h3>HobbyBlog</h3>
                  <p class="mb-0">
                    Share your hobbies with the world! Write about your
                    interests and connect with other hobbyists.
                  </p>
                </div>
                <div class="col-lg-4 mb-5 mb-lg-0">
                  <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                    <i data-feather="smartphone"></i>
                  </div>
                  <h3>HobbyHub</h3>
                  <p class="mb-0">
                    Find new hobbies and connect with other hobbyists in your
                    area.
                  </p>
                </div>
                <div class="col-lg-4">
                  <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                    <i data-feather="code"></i>
                  </div>
                  <h3>HobbyMarket</h3>
                  <p class="mb-0">
                    Buy and sell hobby gear and accessories. Connect with other
                    hobbyists and share your passion.
                  </p>
                </div>
              </div>
            </div>
            <div class="svg-border-angled text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <polygon points="0,100 100,0 100,100"></polygon>
              </svg>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
