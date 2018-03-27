import { combineReducers } from 'redux';
import SampleReducer from './reducerSample';
import SampleActionReducer from './reducerActionSample';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  sample: SampleReducer,
  actionSample: SampleActionReducer,
  auth: authReducer
});

export default rootReducer;