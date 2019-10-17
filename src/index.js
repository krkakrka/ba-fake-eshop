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

function productExists(products, product) {
  return products.find(p => p.id === product.id);
}

function fakeEShopReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_TO_CART':
      if (!productExists(state.cartProducts, action.product)) {
        const newState = {
          ...state,
          cartProducts: [
            ...state.cartProducts,
            action.product
          ]
        };
        return newState;
      } else {
        return state;
      }
    case 'ADD_TO_FAVOURITES':
      if (!productExists(state.favouriteProducts, action.product)) {
        const newState = {
          ...state,
          favouriteProducts: [
            ...state.favouriteProducts,
            action.product
          ]
        };
        return newState;
      } else {
        return state;
      }
    case 'GOT_PRODUCTS':
      return {...state, products: action.products };
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
