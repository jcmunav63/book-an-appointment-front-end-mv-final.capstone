import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './UsersReducer';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
