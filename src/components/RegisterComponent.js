/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import '../assets/css/register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const role = 'default';
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    user, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(`Error registering: ${message}. Please try again.`);
    }

    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({
      name, email, password, passwordConfirmation, role,
    }));
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="register-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="register-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-group">
            <label htmlFor="passwordConfirmation">Confirm Password:</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <input type="hidden" id="role" value={role} />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
