import React, { useState, useEffect } from 'react';
import './HomePage.css';
import {Link} from 'react-router-dom';


//import { Link } from 'react-router-dom';

const HomePage = () => {
  // Define state for the list of departments
  const [departments, setdepartments] = useState([]);

  // Function to fetch departments from the backend
  const fetchdepartmentsFromBackend = async () => {
    try {
      const response = await fetch('https://courseconnect-delta.vercel.app/api/departments');
      if (!response.ok) {
        console.log("failed")
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setdepartments(data); // Assuming the response data is an array of departments
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Call the function to fetch departments when the component mounts
  useEffect(() => {
    fetchdepartmentsFromBackend();
  }, []);

  return (

    <div className="homepage-container">
      
      {/* Render the list of departments dynamically */}
      <div className="departments-container">
        {departments.map((course, index) => (
          <Link to={`/classpage/${course.id}`} key={index}>
            <button className="department-button">{course.data.name}</button>
          </Link>
        ))}
      </div>
  
    </div>
    
  );
}

export default HomePage;
