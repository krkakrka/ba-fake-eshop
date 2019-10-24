import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import './index.scss';
import App from './app';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_END
} from './app/actions';

const INITIAL_PRODUCTS_STATE = {
  products: [],
  loading: false,
  error: undefined
};

function productExists(products, product) {
  return products.find(p => p.id === product.id);
}

function cartProducts(state = [], action) {
  switch(action.type) {
    case ADD_TO_CART:
      if (!productExists(state, action.product)) {
        return [...state, action.product];
      } else {
        return state;
      }
    default:
      return state;
  }
}

function favouriteProducts(state = [], action) {
  switch(action.type) {
    case ADD_TO_FAVOURITES:
      if (!productExists(state, action.product)) {
        return [...state, action.product];
      } else {
        return state;
      }
    default:
      return state;
  }
}

function products(state = INITIAL_PRODUCTS_STATE, action) {
  switch(action.type) {
    case GET_PRODUCTS_START:
      return { ...state, loading: true, error: undefined };
    case GET_PRODUCTS_END:
        return { ...state, loading: false };
    case GET_PRODUCTS_ERROR:
        return { ...state, error: 'Oh no! Something went wrong!' };
    case GOT_PRODUCTS:
      return {...state, products: action.products };
    default:
      return state;
  }
}

const fakeEShopReducer = combineReducers({
  cartProducts,
  favouriteProducts,
  products
})

const store = createStore(
  fakeEShopReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
