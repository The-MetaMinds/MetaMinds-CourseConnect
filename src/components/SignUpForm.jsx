import React, { useState } from 'react';
import './SignUpForm.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '',
    contactNumber: '',
    openToTutoring: false,
    course: '', // New state for the course input
    coursesCompleted: []
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    // Email validation
    if (name === 'email') {
      const lowercaseEmail = value.toLowerCase();
      if (lowercaseEmail.endsWith('@scarletmail.rutgers.edu')) {
        setErrorMessage('');
      } else {
        setErrorMessage('Please use a scarletmail.rutgers.edu email');
      }
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If email format is incorrect, do not proceed with submission
    if (errorMessage !== '') {
      return;
    }

    formData.email = formData.email.toLowerCase()

    // Handle form submission logic here
    try {
      const response = await axios.post('https://courseconnect-delta.vercel.app/api/users', formData);
  
      //remove below line cos it leading to breach
      console.log('User registered successfully:', response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setErrorMessage('');

      navigate('/login')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // Extract error message from the response data
        console.error('Error registering user:', error.response.data);

        setErrorMessage(error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error registering user: No response received');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error registering user:', error.message);
      }
    }
  };


  return (
    <div className='sign-up'>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture">
          <img src="defaultProfilePic.jpg" alt="Default Profile" />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group" >
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: errorMessage ? '0' : '20px' }}>
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
        {errorMessage && <p style={{ color: 'red', marginTop: 0}}>{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <img
              src="eyesymbol.png"
              alt="Show Password"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: (formData.confirmPassword !== '' && formData.password !== formData.confirmPassword)  ? '0' : '20px' }}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
            <img
              src="eyesymbol.png"
              alt="Show Password"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        {formData.confirmPassword !== '' && formData.password !== formData.confirmPassword && <p style={{ color: 'red', paddingTop: 0}}>password don't match</p>}
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
        <button type="submit" disabled={errorMessage !== ''}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;

// import React, { useState } from 'react';
// import './SignUpForm.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SignUpForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     major: '',
//     contactNumber: '',
//     openToTutoring: false,
//     course: '',
//     coursesCompleted: [],
//     image: null, // New state for the image file
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'email') {
//       const lowercaseEmail = value.toLowerCase();
//       if (lowercaseEmail.endsWith('@scarletmail.rutgers.edu')) {
//         setErrorMessage('');
//       } else {
//         setErrorMessage('Please use a scarletmail.rutgers.edu email');
//       }
//     }

//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prevState => ({
//       ...prevState,
//       image: file,
//     }));
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(prevState => !prevState);
//   };

//   const handleAddCourse = (e) => {
//     e.preventDefault();
//     if (formData.major && formData.course) {
//       setFormData(prevState => ({
//         ...prevState,
//         coursesCompleted: [...prevState.coursesCompleted, formData.course],
//         course: '',
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (errorMessage !== '') {
//       return;
//     }

//     formData.email = formData.email.toLowerCase();

//     try {
//       const response = await axios.post('https://courseconnect-delta.vercel.app/api/users', formData);
//       console.log('User registered successfully:', response.data);
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       });

//       setErrorMessage('');

//       navigate('/login');
//     } catch (error) {
//       if (error.response) {
//         console.error('Error registering user:', error.response.data);
//         setErrorMessage(error.response.data);
//       } else if (error.request) {
//         console.error('Error registering user: No response received');
//       } else {
//         console.error('Error registering user:', error.message);
//       }
//     }
//   };

//   return (
//     <div className="sign-up">
//       <form onSubmit={handleSubmit}>
//         {/* Other form fields */}
//         <div className="form-group">
//           <label htmlFor="image">Profile Picture:</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         {/* Other form fields */}
//         <button type="submit" disabled={errorMessage !== ''}>
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;

