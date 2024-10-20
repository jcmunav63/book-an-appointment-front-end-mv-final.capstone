/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import '../assets/css/login.css';

const Login = () => {
  const [email, setEmail] = useState('hirejulio@gmail.com');
  const [password, setPassword] = useState('password');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  // Handle effects
  useEffect(() => {
    if (isError) {
      alert(`Error logging in: ${message}. Please try again.`);
    }

    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset()); // Reset the auth state on component unmount
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Handle clearing credentials
  const handleClearCredentials = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <p>
          Email and password are pre-filled for quick access to the project.
          You can also
          <button
            type="button"
            onClick={handleClearCredentials}
            className="clear-credentials-btn"
          >
            clear
          </button>
          the credentials to test with your own email and password.
        </p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
