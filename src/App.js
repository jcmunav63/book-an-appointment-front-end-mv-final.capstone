import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Users from './components/Users';
import Login from './components/LoginComponent';
import './App.css';
import Register from './components/RegisterComponent';
import NewReservationForm from './components/NewReservationForm';
import Splash from './splash';

const PrivateRoute = ({ children }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  return user ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route exact path="/NewReservation" element={<NewReservationForm />} />
          {/* More routes here if needed */}
          <Route component={() => <div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
