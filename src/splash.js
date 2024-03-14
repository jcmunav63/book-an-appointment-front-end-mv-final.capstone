import React from 'react';
import './splash.css';

function Splash() {
  return (
    <div className="splash-screen">
      <div className="splash-overlay">
        <h1 className="splash-welcome">Alpha Reservations</h1>
        <div className="splash-btn-container">
          <button type="button" className="splash-login-btn">Log In</button>
          <button type="button" className="splash-signup-btn">Sing Up</button>
        </div>
      </div>
    </div>
  );
}

export default Splash;
