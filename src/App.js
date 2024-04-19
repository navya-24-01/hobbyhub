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

import ProfilePage from "./Components/Pages/ProfilePage";
import { ProfileProvider } from "./Context/ProfileContext";

import ListingsPage from "./Components/Pages/Listings";
import ListingDetails from "./Components/Pages/ListingDetails";
import ConversationsPage from "./Components/Pages/Conversations";
import RentedItems from "./Components/Pages/RentedItems";
import { ConversationsProvider } from "./Context/ConversationsContext";
// fh
import { Chat } from "./Components/Pages/Chat";
import ComplaintPage from "./Components/Pages/ComplaintPage";

import WriteBlog from "./Components/Pages/WriteBlog";
import AllBlogs from "./Components/Pages/AllBlogs";
import BlogContents from "./Components/Pages/BlogContent";
import MyBlog from "./Components/Pages/MyBlog";
import ReviewsReceived from "./Components/Pages/ReviewsReceived";
import PaymentsReceived from "./Components/Pages/PaymentsReceived";

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <ProfileProvider>
          <ListingProvider>
            <ConversationsProvider>
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
                  path="/conversations"
                  element={
                    <PrivateRoute>
                      <ConversationsPage />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/chat/:conversationId"
                  element={
                    <PrivateRoute>
                      <Chat />
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
                  path="/review/:renterId/:renteeUsername"
                  element={<ReviewForm />}
                />
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
                  path="/rentedlistings"
                  element={
                    <PrivateRoute>
                      <RentedItems />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/reviewsreceived"
                  element={
                    <PrivateRoute>
                      <ReviewsReceived />
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
                  path="/listing/:listingId"
                  element={<ListingDetails />}
                />{" "}
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
                      <ListingsPage />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/writeBlog"
                  element={
                    <PrivateRoute>
                      <WriteBlog />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/myBlog"
                  element={
                    <PrivateRoute>
                      <MyBlog />
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
                  path="/allBlogs"
                  element={
                    <PrivateRoute>
                      <AllBlogs />
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/blog/:id" element={<BlogContents />} />{" "}
                <Route
                  path="/complaint"
                  element={
                    <PrivateRoute>
                      <ComplaintPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/PaymentsReceived"
                  element={
                    <PrivateRoute>
                      <PaymentsReceived />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </ConversationsProvider>
          </ListingProvider>
        </ProfileProvider>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
