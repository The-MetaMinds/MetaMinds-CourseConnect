import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css"; // Assuming you have a CSS file for styling
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userId, onLogout, isAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogOut = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" /> {/* Use the imported logo */}
        </Link>
      </div>
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        {!isAuthenticated() ? (
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to={`/profile/${userId}`}>Profile</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        )}
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Navbar;
