import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
//import CheckoutForm from "./Components/Pages/Checkout";
import SignInPage from "./Components/Pages/SignInPage";
import ReviewForm from "./Components/Pages/ReviewForm";

import PrivateRoute from "./Components/Pages/PrivateRoute";
import { ListingProvider } from "./Context/ListingContext";
import CreateListingPage from "./Components/Pages/CreateAListingPage";

import ProfilePage from "./Components/Pages/ProfilePage";
import { ProfileProvider } from "./Context/ProfileContext";

import ListingsPage from "./Components/Pages/Listings";
import ListingDetails from "./Components/Pages/ListingDetails";


function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <ProfileProvider>
        <ListingProvider>
          <Routes>
            <Route exact path="/" Component={WelcomePage} />
            <Route exact path="/signup" Component={SignUpPage} />
            <Route exact path="/signin" Component={SignInPage} />


            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            ></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            ></Route>

         




          <Route
                    path="/listings"
                    element={
                      <PrivateRoute>
                        <ListingsPage />
                      </PrivateRoute>
                    }
                  ></Route>


<Route
                    path="/reviews"
                    element={
                      <PrivateRoute>
                        <ReviewForm />
                      </PrivateRoute>
                    }
                  ></Route>


                  


          

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
                        <ListingsPage/>
                      </PrivateRoute>
                    }
                  ></Route>
<Route path="/listing/:listingId" element={<ListingDetails />} />{" "}


            <Route />
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
                  <Listings />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </ListingProvider>
        </ProfileProvider>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
