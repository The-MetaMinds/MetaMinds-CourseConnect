import React, { useState, useEffect } from 'react';
import './ClassPage.css';
import { useParams } from "react-router-dom";

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

  const createNewPost = () => {
    const newQuestion = prompt("Enter your question:");
    if (newQuestion !== null && newQuestion.trim() !== '') {
      const newPost = {
        id: posts.length + 1,
        title: newQuestion,
        content: '', // Empty content for now
        username: "Anonymous",
        timestamp: new Date().toISOString()
      };
      setPosts([newPost, ...posts]);
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
        <button onClick={createNewPost}>Create New Post</button>
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
      </div>
    </div>
  );
};

export default ClassPage;
