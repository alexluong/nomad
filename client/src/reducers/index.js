import { combineReducers }        from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer                from './authReducer';
import listsReducer               from './listsReducer';
import navigationReducer          from './navigationReducer';

const rootReducer = combineReducers({
  auth      : authReducer ,
  form      : formReducer ,
  lists     : listsReducer,
  navigation: navigationReducer
});

export default rootReducer;