import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import listsReducer from './ListsReducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  lists: listsReducer
});

export default rootReducer;