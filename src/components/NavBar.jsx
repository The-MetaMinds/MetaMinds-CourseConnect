import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css'; // Assuming you have a CSS file for styling
import logo from './logo.png';

const Navbar = ({userId}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" /> {/* Use the imported logo */}
        </Link>
      </div>
      <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to={`/profile/${userId}`}>Profile</Link></li>
          <li><Link to="/registration">Registration</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
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
