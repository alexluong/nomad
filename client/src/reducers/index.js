import { combineReducers } from 'redux';
import authReducer from './authReducer';
import listsReducer from './listsReducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  lists: listsReducer
});

export default rootReducer;