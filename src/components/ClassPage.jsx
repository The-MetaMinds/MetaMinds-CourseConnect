import React, { useState, useEffect } from 'react';
import './ClassPage.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Question = ({ id, title, content, username, timestamp, lastReply, replies, onReply }) => (
  <div className="question-container">
    <div className="question">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Posted by {username} on {formatDate(timestamp)}</p>
      {lastReply && <p>Last replied to at {formatDate(lastReply)}</p>}
      <button onClick={() => onReply(id)}>Reply</button>
    </div>
    {replies.map((reply, index) => (
      <Reply key={index} content={reply.content} username={reply.username} timestamp={reply.timestamp} />
    ))}
  </div>
);

const Reply = ({ content, username, timestamp }) => (
  <div className="reply">
    <p>{content}</p>
    <p>Posted by {username} on {formatDate(timestamp)}</p>
  </div>
);

const ClassPage = () => {
  const { departmentID } = useParams();

  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchCoursesFromBackend = async () => {
      try {
        const response = await fetch(`https://courseconnect-delta.vercel.app/api/departments/${departmentID}/classes`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        //console.log(data)
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCoursesFromBackend();
  }, [departmentID]);

  const handleReply = (postId) => {
    const replyContent = prompt("Enter your reply:");
    if (replyContent !== null) {
      const reply = {
        content: replyContent,
        username: "Anonymous",
        timestamp: new Date().toISOString(),
        postId: postId
      };
      setReplies(prevReplies => [...prevReplies, reply]);
    }
  };

  const handleClassClick = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/posts/${courseId}`);
      if (!response.data || response.data.length === 0) {
        throw new Error('No posts found for this course');
      }
      setPosts(response.data);
      console.log('Posts fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const createNewPost = async () => {
    const newQuestion = prompt("Enter your question:");
    if (newQuestion !== null && newQuestion.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        title: newQuestion,
        content: '', // Empty content for now
        username: "2yMo1j6CtgC0fGCuf373", //hardcoded for now
        timestamp: new Date().toISOString(),
        course : "1VD68JjGxU8hztP3V35c"
      };
      setPosts([newPost, ...posts]);

      try {
        const response = await axios.post('https://courseconnect-delta.vercel.app/api/posts', newPost);
        console.log('Post sent successfully:', response.data);
      }
      catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // Extract error message from the response data
          console.error('Error while posting:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error while posting: No response received');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error while posting:', error.message);
        }
      }

    }
  };

  return (
    <div className="department-container">
      <div className="side-bar">
        <h2>Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <button onClick={() => handleClassClick(course.id)} key={index}>
              <li>{course.name}</li>
            </button>
          ))}
        </ul>
      </div>
      <div className='main'>
        <h2>Posts</h2>
        
        <ul>
          {posts.map((post, index) => (
            <Question
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              username={post.username}
              timestamp={post.timestamp}
              lastReply={(replies.filter(reply => reply.postId === post.id)).length > 0 ? replies.filter(reply => reply.postId === post.id).slice(-1)[0].timestamp : null}
              replies={replies.filter(reply => reply.postId === post.id)}
              onReply={handleReply}
            />
            
          ))}
        </ul>
        <button onClick={createNewPost}>Create New Post</button>
      </div>
    </div>
  );
};

export default ClassPage;
