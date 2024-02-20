import React from 'react'
import './registration.css';
import SignUpForm from './SignUpForm';


const Registration = () => {
  return (
    <div className='registration-container'>
        <div className="registration-header"><h3>Registration</h3></div>
        <div className='registration-content'><SignUpForm /></div>
    </div>
  )
}

export default Registration