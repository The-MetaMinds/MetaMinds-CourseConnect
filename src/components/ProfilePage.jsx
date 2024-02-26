import React from 'react'

const ProfilePage = () => {
  // Sample user data (replace with actual user data when database is set up)
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'CharlieC28', // Dummy password
    major: 'Computer Science',
    coursesCompleted: ['Mathematics', 'Computer Programming', 'Physics'],
    openToTutoring: true
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
      <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Password:</strong> {user.password}</p>
        <p><strong>Major:</strong> {user.major}</p>
        <p><strong>Courses Completed:</strong></p>
        <ul>
          {user.coursesCompleted.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
        <p><strong>Open to Tutoring:</strong> {user.openToTutoring ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default ProfilePage