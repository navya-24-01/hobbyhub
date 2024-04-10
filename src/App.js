import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import Listings from "./Components/Pages/Listings";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
import CheckoutForm from "./Components/Pages/Checkout";
import SignInPage from "./Components/Pages/SignInPage";
import PrivateRoute from "./Components/Pages/PrivateRoute";
import { ListingProvider } from "./Context/ListingContext";
import CreateListingPage from "./Components/Pages/CreateAListingPage";
import ReviewForm from "./Components/Pages/ReviewForm";

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <ListingProvider>
        <Routes>
          <Route exact path="/" Component={WelcomePage} />
          <Route exact path="/signup" Component={SignUpPage} />
          <Route exact path="/signin" Component={SignInPage} />
          <Route exact path="/reviews" Component={ReviewForm} />

          <Route
                    path="/home"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  ></Route>
        
        <Route
                    path="/createlisting"
                    element={
                      <PrivateRoute>
                        <CreateListingPage />
                      </PrivateRoute>
                    }
                  ></Route>

<Route
                    path="/listings"
                    element={
                      <PrivateRoute>
                        <Listings/>
                      </PrivateRoute>
                    }
                  ></Route>

        </Routes>
        </ListingProvider>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
