import './registration.css';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

function UserTest() {
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const emailInputHandler = (e) => {
    setEmailInput(e.target.value);
  }

  const nameInputHandler = (e) => {
    setNameInput(e.target.value);
  }

  const passwordInputHandler = (e) => {
    setPasswordInput(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (emailInput && nameInput && passwordInput) {
      await addDoc(collection(db, "users"), {
        email: emailInput,
        name: nameInput,
        password: passwordInput, // Adding phone to the document
      });

      setEmailInput("");
      setNameInput("");
      setPasswordInput("");
    }
  }

  return (
    <div className='registration-container'>
      <div className="registration-header"><h3>Registration</h3></div>
      <div className='registration-content'>
        <form onSubmit={submitHandler} className="form">
          <div>
            <label>Email:</label>
            <input
              className="email-input"
              onChange={emailInputHandler}
              type="email"
              value={emailInput}
            />
          </div>
          <br />
          <div>
            <label>Name:</label>
            <input
              className="name-input"
              onChange={nameInputHandler}
              type="text"
              value={nameInput}
            />
          </div>
          <br />
          <div>
            <label>Password:</label>
            <input
              className="password-input"
              onChange={passwordInputHandler}
              type="password" // Assuming phone number input, you can adjust accordingly
              value={passwordInput}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default UserTest;
