import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './index.scss';
import App from './app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const INITIAL_STATE = {
  products: [],
  cartProducts: [],
  favouriteProducts: [],
  loading: false,
  error: undefined
};

function fakeEShopReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
}

const store = createStore(
  fakeEShopReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
