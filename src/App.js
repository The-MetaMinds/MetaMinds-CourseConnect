import './App.css';
import Registration from './components/registration';

{/*
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Route, and Link
*/}

import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <h3>This is Metamind site</h3>
      <Registration />
      <h2> Gus JS </h2>
      <h3>Test</h3>
      <h3>Peter's Test</h3>
      <h4>Discord Test 2</h4>
      <h5>Edward's Test</h5>
      <h5> Kenneth slay </h5>
      <h5>Mayra's</h5>

      {/* Link to HomePage component */}
      <Link to="/homepage">
        <button>Go to HomePage</button>
      </Link>
        
      {/* Route for HomePage component 
      <Route path="/homepage" component={HomePage} 
      */}


    </div>
  );
}
//This is a test
export default App;