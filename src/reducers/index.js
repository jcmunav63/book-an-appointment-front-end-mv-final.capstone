import { combineReducers } from 'redux';
import usersReducer from './UsersReducer';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
