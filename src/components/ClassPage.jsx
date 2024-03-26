import React from 'react';
import './ClassPage.css';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Question = ({ title, content }) => (
  <div className="question">
    <h3>{title}</h3>
    <p>{content}</p>
    <button>Reply</button>
  </div>
);

const ClassPage = () => {

  const { departmentID } = useParams();

  // Static data for courses and posts
  const [courses, setcourses] = useState([]);
  //const courses = ['Course 1', 'Course 2', 'Course 3'];
  const posts = [{title:"Calc 1 help Please! Derivatives?",
  content: " I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."},
  {
    title:"College Algebra: I don't understand variables",
      content:"I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."
  }
];

  const fetchcoursesFromBackend = async () => {
    try {
      const response = await fetch(`https://courseconnect-delta.vercel.app/api/departments/${departmentID}/classes`);
      if (!response.ok) {
        console.log("failed")
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      console.log(data)
      setcourses(data); // Assuming the response data is an array of departments
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Call the function to fetch departments when the component mounts
  useEffect(() => {
    fetchcoursesFromBackend();
  },[departmentID]);

  return (
    <div className="department-container">
      <div className="side-bar">
        <h2>Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course.name}</li>
          ))}
        </ul>
      </div>
      <div className='main'>
        <h2>Posts</h2>
        <ul>
          {posts.map((post, index) => (
            <Question key={index} title={post.title} content={post.content} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassPage;
