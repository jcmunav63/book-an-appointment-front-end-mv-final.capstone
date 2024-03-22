import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from './HomeReducer';
import authReducer from '../features/auth/authSlice';
import reservationReducer from './reservationReducer';

const rootReducer = combineReducers({
  coworkingSpaces: homeReducer,
  auth: authReducer,
  reservation: reservationReducer,
});

export default rootReducer;
