import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthorizationContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/signin" />;
}