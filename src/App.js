import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./Components/Pages/SignUpPage";
import LogInPage from "./Components/Pages/LogInPage";
import WelcomePage from "./Components/Pages/WelcomePage";
import HomePage from "./Components/Pages/HomePage";
import { AuthorizationProvider } from "./Context/AuthorizationContext";
import CheckoutForm from "./Components/Pages/Checkout"

function App() {
  return (
    <Router>
      <AuthorizationProvider>
        <Routes>
          <Route exact path="/" Component={WelcomePage} />
          <Route exact path="/signup" Component={SignUpPage} />
          <Route exact path="/signin" Component={LogInPage} />
          <Route exact path="/home" Component={HomePage} />
        </Routes>
      </AuthorizationProvider>

      <Routes>
        <Route exact path='checkout/' index element={<CheckoutForm />} />
      </Routes>


    </Router>


  );
}

export default App;
