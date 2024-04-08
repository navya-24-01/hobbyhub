import Navbar from "./Navbar";
import "./styles.css";
import { Link } from "react-router-dom";
//import LoginModal from "./LoginModal";

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
                  <h3>Built for developers</h3>
                  <p class="mb-0">
                    Our modular, block-based build system makes building your
                    next project fast and easy!
                  </p>
                </div>
                <div class="col-lg-4 mb-5 mb-lg-0">
                  <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                    <i data-feather="smartphone"></i>
                  </div>
                  <h3>Modern responsive design</h3>
                  <p class="mb-0">
                    This UI Kit is build mobile-first, meaning it is will
                    function beautifully on any device!
                  </p>
                </div>
                <div class="col-lg-4">
                  <div class="icon-stack icon-stack-xl bg-gradient-primary-to-secondary text-white mb-4">
                    <i data-feather="code"></i>
                  </div>
                  <h3>Complete documentation</h3>
                  <p class="mb-0">
                    All of the layouts, page sections, components, and utilities
                    are fully covered in this products docs.
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
      <div id="layoutDefault_footer">
        <footer class="footer pt-10 pb-5 mt-auto bg-dark footer-dark">
          <div class="container px-5">
            <div class="row gx-5">
              <div class="col-lg-3">
                <div class="footer-brand">SB UI Kit Pro</div>
                <div class="mb-3">Design made easy</div>
                <div class="icon-list-social mb-5">
                  <a class="icon-list-social-link" href="#!">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a class="icon-list-social-link" href="#!">
                    <i class="fab fa-facebook"></i>
                  </a>
                  <a class="icon-list-social-link" href="#!">
                    <i class="fab fa-github"></i>
                  </a>
                  <a class="icon-list-social-link" href="#!">
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-9">
                <div class="row gx-5">
                  <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div class="text-uppercase-expanded text-xs mb-4">
                      Product
                    </div>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <a href="#!">Landing</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Pages</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Sections</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Documentation</a>
                      </li>
                      <li>
                        <a href="#!">Changelog</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <div class="text-uppercase-expanded text-xs mb-4">
                      Technical
                    </div>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <a href="#!">Documentation</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Changelog</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Theme Customizer</a>
                      </li>
                      <li>
                        <a href="#!">UI Kit</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
                    <div class="text-uppercase-expanded text-xs mb-4">
                      Includes
                    </div>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <a href="#!">Utilities</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Components</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Layouts</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Code Samples</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Products</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Affiliates</a>
                      </li>
                      <li>
                        <a href="#!">Updates</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-3 col-md-6">
                    <div class="text-uppercase-expanded text-xs mb-4">
                      Legal
                    </div>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <a href="#!">Privacy Policy</a>
                      </li>
                      <li class="mb-2">
                        <a href="#!">Terms and Conditions</a>
                      </li>
                      <li>
                        <a href="#!">License</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr class="my-5" />
            <div class="row gx-5 align-items-center">
              <div class="col-md-6 small">
                Copyright &copy; Your Website 2023
              </div>
              <div class="col-md-6 text-md-end small">
                <a href="#!">Privacy Policy</a>
                &middot;
                <a href="#!">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
