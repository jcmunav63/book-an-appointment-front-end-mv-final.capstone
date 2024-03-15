import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Login from './components/LoginComponent';
import './App.css';
import Register from './components/RegisterComponent';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/register" element={<Register />} />

          {/* More routes here if needed */}
          <Route component={() => <div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
