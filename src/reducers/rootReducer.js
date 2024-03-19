import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './UsersReducer';
import authReducer from '../features/auth/authSlice';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  reservation: reservationReducer,
});

export default rootReducer;
