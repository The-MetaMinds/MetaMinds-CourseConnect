/*Things to do

1. Make it so that when you come to this page for the first time, there is an active class automatically

*/

import React, { useState, useEffect } from 'react';
import './ClassPage.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Question = ({ id, title, content, username, timestamp, lastReply, replies, onReply }) => {
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = () => {
    onReply(id, replyContent);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
  <div className="question-container">
    <div className="question">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Posted by {username} on {formatDate(timestamp)}</p>
      {lastReply && <p>Last replied to at {formatDate(lastReply)}</p>}
      {!showReplyForm && <button onClick={() => setShowReplyForm(true)}>Reply</button>}
        {showReplyForm && (
          <div>
            <textarea
              className="reply-textarea"
              placeholder="Enter your reply"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <button onClick={handleReplySubmit}>Submit</button>
            <button onClick={() => setShowReplyForm(false)}>Cancel</button>
          </div>
        )}
      </div>
      {replies.map((reply, index) => (
        <Reply key={index} content={reply.content} username={reply.username} timestamp={reply.timestamp} />
      ))}
  </div>
  )
};

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
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [activeClass, setActiveClass] = useState(null); //working on this

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

  const handleReply = async (postId, replyContent) => {
    try {
      const newReply = {
        content: replyContent,
        userId: "wk1Xl9H90fezpEFzxgWe", // Assuming you have the userId
        postId: postId,
        timestamp: new Date().toISOString() // Format timestamp
      };
  
      const response = await axios.post('http://localhost:3000/api/replies', newReply);
      console.log('Reply posted successfully:', response.data);
  
      // Update UI to show the new reply
      const updatedReplies = [...replies, response.data];
      setReplies(updatedReplies);
    } catch (error) {
      console.error('Error posting reply:', error.message);
    }
  };
  
  
  const handleClassClick = async (courseId) => {
    setActiveClass(courseId);
    try {
      const response = await axios.get(`https://courseconnect-delta.vercel.app/api/posts/${courseId}`);
      if (!response.data || response.data.length === 0) {
        throw new Error('No posts found for this course');
      }
      setPosts(response.data);
      
    } catch (error) {
      if (error.response && error.response.data.error === "No Posts yet") {
        setPosts([]); // Clear existing posts
        console.log('No posts found for this course');
      } else {
        console.error('Error fetching posts:', error.message);
      }
    }
  };
  
  

  const createNewPost = async () => {
    setShowNewPostForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newPostTitle.trim() !== '' && newPostContent.trim() !== '') {
      const newPost = {
        title: newPostTitle,
        content: newPostContent,
        username: "Anonymous", //hardcoded for now
        timestamp: new Date().toISOString(),
        course: activeClass // hardcoded for now
      };
      try {
        const response = await axios.post('https://courseconnect-delta.vercel.app/api/posts', newPost);
        console.log('Post sent successfully:', response.data);
        setPosts([response.data, ...posts]);
        setNewPostTitle('');
        setNewPostContent('');
        setShowNewPostForm(false);
      } catch (error) {
        console.error('Error while posting:', error.message);
      }
    } else {
      alert('Please enter a title and content for your post.');
    }
  };

  return (
    <div className="department-container">
      <div className="side-bar">
        <h2>Courses</h2>
        <ul>
          {courses.map((course, index) => (
              <button
              onClick={() => handleClassClick(course.id)}
              key={index}
              className={activeClass === course.id ? 'active' : ''}
            >
              <li>{course.name}</li>
            </button>
          ))}
        </ul>
      </div>
      <div className='main'>
        <h2>Posts</h2>
        {!showNewPostForm ? (
          <button onClick={createNewPost}>Create New Post</button>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              placeholder="Enter post title (max 20 words)" 
              value={newPostTitle} 
              onChange={(e) => setNewPostTitle(e.target.value)} 
              maxLength="100" // Assuming an average of 5 words per title
              required
            />
            <textarea 
              className="textarea"
              placeholder="Enter post content (max 300 words)" 
              value={newPostContent} 
              onChange={(e) => setNewPostContent(e.target.value)} 
              maxLength="1500" // Assuming an average of 5 words per sentence and 30 sentences per post
              required
            />
            <button type="submit">Submit Post</button>
          </form>
        )}
        <ul>
          {posts.length === 0 ? <p> No post for this course </p> : posts.map((post, index) => (
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

