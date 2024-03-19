import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// eslint-disable-next-line import/prefer-default-export
const store = configureStore({
  reducer: rootReducer,
});

export default store;
