import { combineReducers } from 'redux';
import greetingReducer from './GreetingReducer';

const rootReducer = combineReducers({
  greeting: greetingReducer,
});

export default rootReducer;
