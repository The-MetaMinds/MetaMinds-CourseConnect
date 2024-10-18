import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserProvider";

const Layout = () => {
  /*
    const { authToken, logout, isAuthenticated } = useAuth()
  

    // Decode the authentication token to extract user ID
    const userId = authToken ? jwtDecode(authToken).userId.id : null; 

    console.log(userId);
    */

  const { auth } = useUser();

  const authToken = auth.authToken;
  const logout = auth.logout;
  const isAuthenticated = auth.isAuthenticated;
  const userId = auth.user ? auth.user.id : null;

  return (
    <>
      <Navbar
        className="navbar-container"
        userId={userId}
        onLogout={logout}
        isAuthenticated={isAuthenticated}
      />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
