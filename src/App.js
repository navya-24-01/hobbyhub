import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
import SignInPage from "./Components/Pages/SignInPage";
import ReviewForm from "./Components/Pages/ReviewForm";
import SellerListings from "./Components/Pages/SellerListings"; // Add this import

import PrivateRoute from "./Components/Pages/PrivateRoute";
import { ListingProvider } from "./Context/ListingContext";
import CreateListingPage from "./Components/Pages/CreateAListingPage";
import ListingsPage from "./Components/Pages/Listings";
import ListingDetails from "./Components/Pages/ListingDetails";

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <ListingProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route
              path="/listings"
              element={
                <PrivateRoute>
                  <ListingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seller-listings"
              element={
                <PrivateRoute>
                  <SellerListings />
                </PrivateRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <PrivateRoute>
                  <ReviewForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/createlisting"
              element={
                <PrivateRoute>
                  <CreateListingPage />
                </PrivateRoute>
              }
            />
            <Route path="/listing/:listingId" element={<ListingDetails />} />
          </Routes>
        </ListingProvider>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
