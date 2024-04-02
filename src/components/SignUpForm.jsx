import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '',
    contactNumber: '',
    openToTutoring: false,
    course: '', // New state for the course input
    coursesCompleted: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (formData.major && formData.course) {
      setFormData(prevState => ({
        ...prevState,
        coursesCompleted: [...prevState.coursesCompleted, formData.course],
        course: '' // Clear the input field after adding the course
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className='sign-up'>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture">
          <img src="defaultProfilePic.jpg" alt="Default Profile" />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Rutger's Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">Major:</label>
          <input
            type="text"
            id="major"
            name="major"
            placeholder="Major"
            value={formData.major}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course Completed:</label>
          <input
            type="text"
            id="course"
            name="course"
            placeholder="Enter Courses Completed"
            value={formData.course || ''}
            onChange={handleChange}
          />
          {formData.course && (
            <button onClick={handleAddCourse}>Add Course</button>
          )}
        </div>
        {formData.coursesCompleted.length > 0 && (
          <div className="form-group">
            <label>Courses Completed:</label>
            <ul>
              {formData.coursesCompleted.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="openToTutoring">Open to Tutoring:</label>
          <select
            id="openToTutoring"
            name="openToTutoring"
            value={formData.openToTutoring}
            onChange={handleChange}
            required
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
