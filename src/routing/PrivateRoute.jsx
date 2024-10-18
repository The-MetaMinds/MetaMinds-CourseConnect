import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./Layout.css";
import { jwtDecode } from "jwt-decode"; // Import jwt_decode from jwt-decode library
import { useUser } from "../contexts/UserProvider";

const PrivateRoute = () => {
  /*
    const { authToken, isAuthenticated, logout } = useAuth()

    // Decode the authentication token to extract user ID
    const userId = authToken ? jwtDecode(authToken).userId.id : null;
    */
  const { auth } = useUser();

  const isAuthenticated = auth.isAuthenticated;
  const authToken = auth.authToken;
  const userId = auth.user ? auth.user.id : null;
  const user = auth.user;
  const logout = auth.logout;

  if (!isAuthenticated()) {
    return <Navigate to="login" />;
  } else {
    return (
      <>
        <Navbar
          className="navbar-container"
          userId={userId}
          onLogout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className="main-container">
          <Outlet userId={userId} user={user} />
        </div>
      </>
    );
  }
};

export default PrivateRoute;
