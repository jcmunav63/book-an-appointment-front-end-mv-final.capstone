import { combineReducers } from '@reduxjs/toolkit';
import coworkingSpacesReducer from '../features/coworkingSpaces/coworkingSpacesSlice';
import authReducer from '../features/auth/authSlice';
import reservationsReducer from '../features/reservations/reservationsSlice';

const rootReducer = combineReducers({
  coworkingSpaces: coworkingSpacesReducer,
  auth: authReducer,
  reservations: reservationsReducer,
});

export default rootReducer;
