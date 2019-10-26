import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './index.scss';
import App from './app';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from './app/reducers';

const fakeEShopReducer = combineReducers(reducers);

const store = createStore(
  fakeEShopReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
