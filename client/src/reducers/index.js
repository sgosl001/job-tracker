import { combineReducers } from 'redux';
import jobReducer from './jobReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  jobs: jobReducer,
  error: errorReducer,
  auth: authReducer,
});
