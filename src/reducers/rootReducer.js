import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './HomeReducer';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  coworkingSpaces: homeReducer,
  auth: authReducer,
});

export default rootReducer;
