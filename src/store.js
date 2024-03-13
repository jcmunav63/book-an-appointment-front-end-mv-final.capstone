// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/UsersReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
