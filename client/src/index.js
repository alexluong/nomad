import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

// To persist State to LocalStorage
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

// The App
import App from './App';

// Not sure what this is
import registerServiceWorker from './registerServiceWorker';

const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(reduxThunk)
);

store.subscribe(throttle(() => {
  const { lists, auth } = store.getState();
  if (auth.authenticated) {
    saveState({ lists, auth });
  } else {
    saveState({ auth: { ...auth, errorMessage: '' } });
  }
}, 1000));

ReactDOM.render(
  <App store={store} />
  , document.getElementById('root')
);

registerServiceWorker();