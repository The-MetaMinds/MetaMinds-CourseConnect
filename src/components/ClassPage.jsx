/*Things to do

1. Make it so that when you come to this page for the first time, there is an active class automatically
2. Work on the date of the replies
3. Work on the profile of each user showing in the post and replies

*/

import React, { useState, useEffect } from 'react';
import './ClassPage.css';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

const Question = ({ id, title, content, user, timestamp, lastReply, replies, onReply }) => {
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


      <div className="user-info">
          {user && (
            <Link to={`/profile/${user.userId}`} className="user-link">
              <img src={user.image ? user.image : require('../defaultProfilePic.jpg')} alt={`${user.firstname} ${user.lastname}`} className="profile-pic" />
              {`${user.firstname}`}
            </Link>
          )}
          {!user && <span>Unknown user</span>}
      </div>
      <p>Posted on {formatDate(timestamp)}</p>

      {/*}
      <p>Posted by {user ? <Link to={`/profile/${user.userId}`}>{user.firstname}</Link>: 'unknown user'} on {formatDate(timestamp)}</p>
       */}
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

  const { authToken} = useAuth()

  // Decode the authentication token to extract user ID
  const userId = authToken ? jwtDecode(authToken).userId.id : null; 
  const { departmentID } = useParams();


  const [courses, setCourses] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [activeClass, setActiveClass] = useState(null); //working on this
  const [dropdownVisible, setDropdownVisible ] = useState(false);


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
        userId: userId, // Assuming you have the userId
        postId: postId,
        timestamp: new Date().toISOString() // Format timestamp
      };
  
      const response = await axios.post('https://courseconnect-delta.vercel.app/api/replies', newReply);
      console.log('Reply posted successfully:', response.data);
  
      // Update UI to show the new reply
      const updatedReplies = [...replies, response.data];
      setReplies(updatedReplies);
    } catch (error) {
      console.error('Error posting reply:', error.message);
    }
  };
  

  const handleClassClick = async (course) => {
    const courseId = course.id;
    setActiveClass(course);
    try {
      const response = await axios.get(`https://courseconnect-delta.vercel.app/api/posts/${courseId}`);
      console.log(response)
      if (!response.data || response.data.length === 0) {
        throw new Error('No posts found for this course');
      }
      setPosts(response.data);
  
      // Fetch replies for each post
      const postIds = response.data.map(post => post.id);
      const fetchRepliesPromises = postIds.map(async postId => {
        const repliesResponse = await axios.get(`https://courseconnect-delta.vercel.app/api/replies/${postId}`);
        return { postId, replies: repliesResponse.data };
      });
      const fetchedReplies = await Promise.all(fetchRepliesPromises);
      console.log(fetchedReplies);
  
      // Update state with fetched replies
      const repliesMap = fetchedReplies.reduce((map, { postId, replies }) => {
        map[postId] = replies;
        return map;
      }, {});
      setReplies(repliesMap);
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
        username: userId,
        timestamp: new Date().toISOString(),
        course: activeClass.id 
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


  const toggleDropdown = () => {
    setDropdownVisible((prevVisible) => !prevVisible);
  };

  // Function to handle course selection from the dropdown menu
  const handleCourseSelection = (course) => {
    handleClassClick(course); // Function to load posts for the selected course
    setDropdownVisible(false); // Hide the dropdown menu after selection
  };
 
  return (
    <div className="department-container">

      <div className="side-bar">
        <h2>Courses</h2>
        <ul>
          {courses.map((course, index) => (
              <button
              onClick={() => handleClassClick(course)}
              key={index}
              className={activeClass === course.id ? 'active' : ''}
            >
              <li>{course.name}</li>
            </button>
          ))}
        </ul>
      </div>
      <div className='main'>

        <div className="dropdown">
        <button className="dropbtn" onClick={toggleDropdown}>{activeClass ? activeClass.name : 'Select Course'}<span className="dropdown-icon">&#9660;</span></button>
          {dropdownVisible && (
            <div className="dropdown-content">
              {courses.map((course) => (
                <button key={course.id} onClick={() => handleCourseSelection(course)}>
                  {course.name}
                </button>
              ))}
            </div>
          )}
        </div>

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
              user={post.user}//could be empty object
              timestamp={post.timestamp}
              lastReply={replies[post.id] ? new Date(replies[post.id].reduce((latestReply, reply) => {
                return latestReply.timestamp > reply.timestamp ? latestReply : reply;
              }, { timestamp: '' }).timestamp).toLocaleTimeString() : null}
              
              replies = {replies[post.id] || []}
              onReply={handleReply}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassPage;

