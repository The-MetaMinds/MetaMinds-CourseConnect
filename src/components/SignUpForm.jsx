import React, { useState, useEffect } from 'react';
import './SignUpForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    image: null,
    coursesCompleted: [],
  });

  const [allSelectedCourses, setAllSelectedCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [classes, setClasses] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://courseconnect-delta.vercel.app/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      if (selectedDepartment) {
        try {
          const response = await axios.get(`https://courseconnect-delta.vercel.app/api/departments/${selectedDepartment}/classes`);
          setClasses(response.data);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      }
    };

    fetchClasses();
  }, [selectedDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const handleClassClick = (selectedCourse) => {
    const isCourseSelected = allSelectedCourses.some(course => course.id === selectedCourse.id);

    if (isCourseSelected) {
      setAllSelectedCourses(prevState => prevState.filter(course => course.id !== selectedCourse.id));
      setFormData(prevState => ({
        ...prevState,
        coursesCompleted: prevState.coursesCompleted.filter(id => id !== selectedCourse.id),
      }));
    } else {
      setAllSelectedCourses(prevState => [...prevState, selectedCourse]);
      setFormData(prevState => ({
        ...prevState,
        coursesCompleted: [...prevState.coursesCompleted, selectedCourse.id]
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errorMessage !== '') {
      return;
    }

    formData.email = formData.email.toLowerCase();

    const formDataToSend = new FormData();

  // Append all form data to formDataToSend
    Object.keys(formData).forEach(key => {
      if (key !== 'coursesCompleted'){
        formDataToSend.append(key, formData[key]);
      }
      else{
        formDataToSend.append('coursesCompleted', JSON.stringify(formData.coursesCompleted));
      }
      
    });

    


    try {
      /*
      const response = await axios.post('http://localhost:3000/api/users', formData);
      */
      const response = await axios.post('https://courseconnect-delta.vercel.app/api/users', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });



      console.log('User registered successfully:', response.data);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        major: '',
        contactNumber: '',
        openToTutoring: false,
        image: null,
        coursesCompleted: [],
      });

      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Error registering user:', error.response.data);
        setErrorMessage(error.response.data);
      } else if (error.request) {
        console.error('Error registering user: No response received');
      } else {
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
        <div className="form-group">
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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
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
        <div className="form-group">
          <label htmlFor="image">Profile Picture:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group">
          <h3>Course Completed:</h3>
          <ul>
            {allSelectedCourses.map(course => (
              <li key={course.id}>{course.name}</li>
            ))}
          </ul>
        </div>

        {/* ... (rest of the form fields remain unchanged) */}

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map(department => (
              <option key={department.id} value={department.id}>
                {department.data.name}
              </option>
            ))}
          </select>
        </div>

        {classes && classes.length > 0 && (
          <div className="form-group">
            <label>Classes:</label>
            <ul>
              {classes.map(cls => (
                <li
                  key={cls.id}
                  onClick={() => handleClassClick(cls)}
                  style={{ color: allSelectedCourses.some(course => course.id === cls.id) ? 'blue' : 'black', cursor: 'pointer' }}
                >
                  {cls.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" disabled={errorMessage !== ''}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
