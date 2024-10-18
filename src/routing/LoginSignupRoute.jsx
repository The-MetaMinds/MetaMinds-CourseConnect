import Navbar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import { useUser } from "../contexts/UserProvider";

const LoginSignupRoute = () => {
  const { auth } = useUser();

  /*
    const isAuthenticated = () => {
        return false;
    }
    */

  const isAuthenticated = auth.isAuthenticated;

  return (
    <>
      <Navbar
        className="navbar-container"
        userId={null}
        isAuthenticated={isAuthenticated}
      />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default LoginSignupRoute;
