import React from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.css';

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="splash-screen">
      <div className="splash-overlay">
        <h1 className="splash-welcome">Smart Coworking</h1>
        <div className="splash-btn-container">
          <button type="button" className="splash-login-btn" onClick={() => navigate('/login')}>Log In</button>
          <button type="button" className="splash-signup-btn" onClick={() => navigate('/register')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Splash;
