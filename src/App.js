import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/LoginComponent';
import './App.css';
import Register from './components/RegisterComponent';
import NewReservationForm from './components/NewReservationForm';
import Splash from './splash';
import NewSpaceCwForm from './components/NewSpaceCwForm';
import DeleteSpaceCwForm from './components/DeleteSpaceCwForm';
import Sidebar from './components/SidebarComponent';
import UserReservations from './components/UserReservations';

const PrivateRoute = ({ children }) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  return user ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  const userId = JSON.parse(localStorage.getItem('user'))?.user.id;
  console.log('User ID:', userId);
  return (
    <Router>
      <div id="main-div">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route exact path="/newSpaceCw" element={<NewSpaceCwForm />} />
          <Route exact path="/deleteSpaceCw" element={<DeleteSpaceCwForm />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/NewReservation" element={<NewReservationForm />} />
          <Route exact path="/MyReservations" element={<UserReservations userId={userId} />} />
          <Route exact path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          {/* More routes here if needed */}
          <Route component={() => <div>404 Not Found</div>} />
        </Routes>
      </div>
      <Sidebar />
    </Router>
  );
}

export default App;
