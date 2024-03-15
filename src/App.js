import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import './App.css';
import Splash from './splash';

function App() {
  return (
    <Router>
      <div>
        <Splash />
        <Routes>
          <Route exact path="/" element={<Users />} />
          {/* More routes here if needed */}
          <Route component={() => <div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
