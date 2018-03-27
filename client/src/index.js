import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import './index.css';
import App from './App';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <App store={createStoreWithMiddleware(reducers)} />
  , document.getElementById('root')
);

registerServiceWorker();
