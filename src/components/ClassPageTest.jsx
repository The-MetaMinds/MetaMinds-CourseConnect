// import React from 'react';
// import './ClassPage.css';
// import { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";

// const Question = ({ title, content }) => (
//   <div className="question">
//     <h3>{title}</h3>
//     <p>{content}</p>
//     <button>Reply</button>
//   </div>
// );

// const ClassPage = () => {

//   const { departmentID } = useParams();

//   // Static data for courses and posts
//   const [courses, setcourses] = useState([]);
//   //const courses = ['Course 1', 'Course 2', 'Course 3'];
//   const posts = [{title:"Calc 1 help Please! Integrals?",
//   content: " I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."},
//   {
//     title:"College Algebra: I don't understand variables",
//       content:"I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."
//   }
// ];

  

//   // Call the function to fetch departments when the component mounts
//   useEffect(() => {
//     const fetchcoursesFromBackend = async () => {
//       try {
//         const response = await fetch(`https://courseconnect-delta.vercel.app/api/departments/${departmentID}/classes`);
//         if (!response.ok) {
//           console.log("failed")
//           throw new Error('Failed to fetch departments');
//         }
//         const data = await response.json();
//         console.log(data)
//         setcourses(data); // Assuming the response data is an array of departments
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//       }
//     };
//     fetchcoursesFromBackend();
//   },[departmentID]);

//   return (
//     <div className="department-container">
//       <div className="side-bar">
//         <h2>Courses</h2>
//         <ul>
//           {courses.map((course, index) => (
//             <li key={index}>{course.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div className='main'>
//         <h2>Posts</h2>
//         <ul>
//           {posts.map((post, index) => (
//             <Question key={index} title={post.title} content={post.content} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ClassPage;

import React, { useState, useEffect } from 'react';
import './ClassPage.css';
import { useParams } from "react-router-dom";

const Question = ({ title, content, onReply }) => (
  <div className="question">
    <h3>{title}</h3>
    <p>{content}</p>
    <button onClick={onReply}>Reply</button>
  </div>
);

const ClassPage = () => {
  const { departmentID } = useParams();

  const [courses, setCourses] = useState([]);
  const [replies, setReplies] = useState({});

  const posts = [
    {
      title: "Calc 1 help Please! Integrals?",
      content: "I am taking calc 1, so far my professor is blah blah...",
    },
    {
      title: "College Algebra: I don't understand variables",
      content: "I am taking calc 1, so far my professor is blah blah...",
    }
  ];

  useEffect(() => {
    const fetchCoursesFromBackend = async () => {
      try {
        const response = await fetch(`https://courseconnect-delta.vercel.app/api/departments/${departmentID}/classes`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCoursesFromBackend();
  }, [departmentID]);

  const handleReply = (postIndex) => {
    const replyContent = prompt("Enter your reply:");
    if (replyContent !== null) {
      setReplies(prevReplies => ({
        ...prevReplies,
        [postIndex]: [...(prevReplies[postIndex] || []), replyContent]
      }));
    }
  };

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
            <div key={index}>
              <Question
                title={post.title}
                content={post.content}
                onReply={() => handleReply(index)}
              />
              <ul>
                {replies[index] && replies[index].map((reply, replyIndex) => (
                  <li key={replyIndex}>{reply}</li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassPage;
