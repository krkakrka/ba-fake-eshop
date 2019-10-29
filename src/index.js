import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './index.scss';
import App from './app';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './app/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { getProducts } from './app/actions';
import { loggerMiddleware } from './app/middlewares';

const fakeEShopReducer = combineReducers(reducers);

const store = createStore(
  fakeEShopReducer,
  composeWithDevTools(
    applyMiddleware(loggerMiddleware, thunk, apiMiddleware)
  )
);

store.dispatch(getProducts());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
