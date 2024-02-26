import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  // Sample user data (replace with actual user data when database is set up)
  const user = {
    firstName: 'Edward',
    lastName: 'Castillo',
    email: 'esc117@scarletmail.rutgers.edu',
    password: 'CharlieC28', // Dummy password
    major: 'Computer Science',
    contactNumber: '123-456-7890',
    coursesCompleted: ['Mathematics', 'Computer Programming', 'Physics'],
    openToTutoring: true
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>
      <div className="profile-info">
        <div className="info-item double-column">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" className="textbox" value={user.firstName} readOnly />
        </div>
        <div className="info-item double-column">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" className="textbox" value={user.lastName} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="email">Scarletmail</label>
          <input type="email" id="email" className="textbox" value={user.email} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="textbox" value={user.password} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="major">Major</label>
          <input type="text" id="major" className="textbox" value={user.major} readOnly />
        </div>
        <div className="info-item">
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="text" id="contactNumber" className="textbox" value={user.contactNumber} readOnly />
        </div>
        <div className="info-item double-column">
          <label htmlFor="coursesCompleted">Courses Completed</label>
          <div className="textbox">
            <ul>
              {user.coursesCompleted.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="info-item double-column">
          <label htmlFor="openToTutoring">Open to Tutoring</label>
          <input type="text" id="openToTutoring" className="textbox" value={user.openToTutoring ? 'Yes' : 'No'} readOnly />
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;