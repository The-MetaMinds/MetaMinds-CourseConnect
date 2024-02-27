import React from 'react';
import './ClassPage.css'; // Make sure to create an App.css file for your styles

// Components
const Navbar = () => (
  <div className="navbar">
    <button>Home</button>
    <button>Profile</button>
    <button>Logout</button>
  </div>
);

const Sidebar = () => (
  <div className="sidebar">
    <button>Mathematics</button>
    {/* Add other buttons or links here */}
  </div>
);

const Question = ({ title, content }) => (
  <div className="question">
    <h3>{title}</h3>
    <p>{content}</p>
    <button>Reply</button>
  </div>
);

const MainContent = () => (
  <div className="main-content">
    <Question
      title="Calc 1 help Please! Derivatives?"
      content="I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."
    />
    <Question
      title="College Algebra: I don't understand variables"
      content="I am taking calc 1, so far my professor is blah blah y j dffr dff dfrgmv frphmq fjkrvor kjdv dfjg...."
    />
    {/* Add more questions here */}
  </div>
);

// Main App component
const ClassPage = () => {
  return (
    <div className="classpage">
      <Navbar />
      <div className="container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

// const ClassPage = () => {
//   return (
//     <div>ClassPage</div>
//   )
// }

export default ClassPage
