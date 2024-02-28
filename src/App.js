// App.js
import './App.css';
import React from 'react';
import Registration from './components/registration';
import UserTest from './components/UserTest';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ClassPage from './components/ClassPage';

function App() {
  return (
    <div className="App">
      <h3>This is Metamind site</h3>
      <div className="users">
        <UserTest/>
      </div>
            {/*<Registration /> */}
      {/*<HomePage />*/}
      {/* Testing^ , will remove once finished */}
      {/*<ProfilePage /> */}
      {/* Testing^ , will remove once finished */}
      {/* <ClassPage/> */}
    </div>
  );
}

export default App;
