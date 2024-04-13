

import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { userID } = useParams();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    contactNumber: '',
    coursesCompleted: [],
    openToTutoring: true
  });

  useEffect(() => {
    const fetchProfileFromBackend = async () => {
      try {
        const response = await axios.get(`https://courseconnect-delta.vercel.app/api/users/${userID}`);
        const userProfile = await response.data;

        // Fetch course names based on IDs
        const courses = await Promise.all(userProfile.coursesCompleted.map(async courseId => {
          const courseResponse = await axios.get(`https://courseconnect-delta.vercel.app/api/courses/${courseId}`);
          return courseResponse.data.name;
        }));

        

        setUser({
          firstName: userProfile.firstname,
          lastName: userProfile.lastname,
          email: userProfile.email,
          major: userProfile.major,
          contactNumber: userProfile.contactNumber,
          openToTutoring: userProfile.openToTutoring,
          coursesCompleted: courses
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchProfileFromBackend();
  }, [userID]);


  return (
    <div className="profile-container">

      <h2 className="profile-heading">User Profile</h2>
      <div className="profile-picture">
        <img src={require('../defaultProfilePic.jpg')} alt="Default Profile" />
      </div>
      <div className="profile-info">
        <div className="info-item double-column">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" className="textbox" value={user.firstName} readOnly />
        </div>
        <div className="info-item double-column">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" className="textbox" value={user.lastName} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="textbox" value={user.email} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="major">Major:</label>
          <input type="text" id="major" className="textbox" value={user.major} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" className="textbox" value={user.contactNumber} readOnly />
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
          <input type="text" id="openToTutoring" className="textbox" value={user.openToTutoring ? 'Yes' : 'No'} readOnly />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
