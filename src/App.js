import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import Listings from "./Components/Pages/Listings";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
import CheckoutForm from "./Components/Pages/Checkout";
import SignInPage from "./Components/Pages/SignInPage";

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <Routes>
          <Route exact path="/" Component={WelcomePage} />
          <Route exact path="/signup" Component={SignUpPage} />
          <Route exact path="/signin" Component={SignInPage} />
          <Route exact path="/home" Component={HomePage} />
          <Route exact path="/listings" Component={Listings} />
        </Routes>
      </AuthorizationProvider>
    </Router>
  );
}

export default App;
