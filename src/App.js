import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
//import CheckoutForm from "./Components/Pages/Checkout";
import SignInPage from "./Components/Pages/SignInPage";
import ListingsPage from "./Components/Pages/Listings";
import ListingDetails from "./Components/Pages/ListingDetails";

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <Routes>
          <Route exact path="/" Component={WelcomePage} />
          <Route exact path="/signup" Component={SignUpPage} />
          <Route exact path="/signin" Component={SignInPage} />
          <Route exact path="/home" Component={HomePage} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listing/:listingId" element={<ListingDetails />} />{" "}
        </Routes>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
