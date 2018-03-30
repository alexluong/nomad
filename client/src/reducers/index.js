import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer
});

export default rootReducer;