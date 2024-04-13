import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import {useParams} from 'react-router-dom'; 
import axios from 'axios';

const Settings = () => {
  const { userID } = useParams();

  // Sample user data (replace with actual user data when database is set up)
  const [isEditMode, setIsEditMode] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '', // Dummy password
    major: '',
    contactNumber: '',
    coursesCompleted: ['Mathematics', 'Computer Programming', 'Physics'],
    openToTutoring: true
  });

  useEffect( () => {
    const fetchProfileFromBackend = async () => {
      try{
        console.log(axios.defaults.headers.common['x-auth-token']);
        const response = await axios.get(`https://courseconnect-delta.vercel.app/api/users/${userID}`);

        const userProfile = await response.data
        setUser(prevUser => ({
          ...prevUser,
          firstName: userProfile.firstname,
          lastName: userProfile.lastname,
          email: userProfile.email,
          major: userProfile.major,
          contactNumber: userProfile.contactNumber,
          openToTutoring: userProfile.openToTutoring,
          coursesCompleted: userProfile.coursesCompleted
        }));
        
        
      }
      catch(error){
        console.error('Error fetching courses:', error);
      }
    };
    fetchProfileFromBackend();
  },[userID]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    // Here you can add code to save the changes to the database
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    // Reset user data back to original values
    setUser({
      firstName: 'Edward',
      lastName: 'Castillo',
      email: 'esc117@scarletmail.rutgers.edu',
      password: 'CharlieC28', // Dummy password
      major: 'Computer Science',
      contactNumber: '123-456-7890',
      coursesCompleted: ['Mathematics', 'Computer Programming', 'Physics'],
      openToTutoring: true
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === "openToTutoring" ? value === "true" : value,
    }));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      <div className="profile-picture">
        <img src={require('../defaultProfilePic.jpg')} alt="Default Profile" />
      </div>
      <div className="profile-info">
        <div className="info-item double-column">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" className="textbox" value={user.firstName} readOnly={!isEditMode} onChange={handleChange} name="firstName" />
        </div>
        <div className="info-item double-column">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" className="textbox" value={user.lastName} readOnly={!isEditMode} onChange={handleChange} name="lastName" />
        </div>
        <div className="info-item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="textbox" value={user.email} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="password">Password:</label>
          <input type={isEditMode ? "text" : "password"} id="password" className="textbox" value={user.password} readOnly={!isEditMode} onChange={handleChange} name="password" />
        </div>
        <div className="info-item">
          <label htmlFor="major">Major:</label>
          <input type="text" id="major" className="textbox" value={user.major} readOnly={!isEditMode} onChange={handleChange} name="major" />
        </div>
        <div className="info-item">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" className="textbox" value={user.contactNumber} readOnly={!isEditMode} onChange={handleChange} name="contactNumber" />
        </div>
        <div className="info-item double-column">
          <label htmlFor="coursesCompleted">Courses Completed:</label>
          <div className="textbox">
            <ul>
              {user.coursesCompleted.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="info-item double-column">
          <label htmlFor="openToTutoring">Open to Tutoring:</label>
          {isEditMode ? (
            <select id="openToTutoring" className="textbox" value={user.openToTutoring} onChange={handleChange} name="openToTutoring">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          ) : (
            <input type="text" id="openToTutoring" className="textbox" value={user.openToTutoring ? 'Yes' : 'No'} readOnly />
          )}
        </div>
      </div>
      {isEditMode ? (
        <div>
          <button className="edit-button" onClick={handleSaveClick}>Save</button>
          <button className="edit-button" onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default Settings;