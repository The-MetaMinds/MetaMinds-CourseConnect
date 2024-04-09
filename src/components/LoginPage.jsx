/* things to do 

1. Make sure the emails show "Invalid email" if the email is invalid
2. Make sure the password shows "Wrong password" if the password is wrong
3. Make sure the api for the login is changed since i changed it the backend

*/



/*

import React from 'react';
import './LoginPage.css'; // Make sure to create an appropriate CSS file for styling
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react';
import useAuth from '../hooks/useAuth';


const LoginBox = () => {

  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      await login(email, password);
      // Redirect or perform other actions upon successful login
      navigate('/')
    } catch (error) {
      // Handle login error
    }
  };

  
  return (
  <div className="login-box">
    <div className="options">
      <button className="google-btn">Sign In with Google</button>
      <Link to="/registration"><button className="signup-btn">Sign Up</button></Link>
    </div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" name="email" value={formData.email} placeholder="ScarletMail" />
      <input onChange= {handleChange} type="password" name="password" value={formData.password} placeholder="Password" />
      <button type='submit'>Sign In</button>
    </form>
  </div>
  )};

const LoginPage = () => (
  <div className="login-page">
    <div className="container">
      <LoginBox />
    </div>
  </div>
);

export default LoginPage;

*/




/*
import React from 'react';
import './LoginPage.css'; // Make sure to create an appropriate CSS file for styling
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

*/



import React from 'react';
import './LoginPage.css'; // Make sure to create an appropriate CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginBox = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const lowerCaseEmail = email.toLowerCase();

    try {
      await login(lowerCaseEmail, password);
      // Redirect or perform other actions upon successful login
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Wrong password');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Email not found');
      } else {
        // Handle other errors
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="login-box">
      <div className="options">
        <button className="google-btn">Sign In with Google</button>
        <Link to="/registration"><button className="signup-btn">Sign Up</button></Link>
      </div>
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="email" value={formData.email} placeholder="ScarletMail" />
        <input onChange={handleChange} type="password" name="password" value={formData.password} placeholder="Password" />
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
};

const LoginPage = () => (
  <div className="login-page">
    <div className="container">
      <LoginBox />
    </div>
  </div>
);

export default LoginPage;
