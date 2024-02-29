import React from 'react';
import './LoginPage.css'; // Make sure to create an appropriate CSS file for styling

const LoginBox = () => (
  <div className="login-box">
    <div className="options">
      <button className="google-btn">Sign In with Google</button>
      <button className="signup-btn">Sign Up</button>
    </div>
    <h2>Login</h2>
    <input type="text" placeholder="ScarletMail" />
    <input type="password" placeholder="Password" />
    <button>Sign In</button>
  </div>
);

const LoginPage = () => (
  <div className="login-page">
    <div className="container">
      <LoginBox />
    </div>
  </div>
);

export default LoginPage;
