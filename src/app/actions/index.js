import { RSAA } from 'redux-api-middleware';

const ADD_TO_CART = 'ADD_TO_CART';
const ADD_TO_FAVOURITES = 'ADD_TO_FAVOURITES';
const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
const SET_CART_QUANTITY = 'SET_CART_QUANTITY';

const getProducts = () => {
  return (dispatch) => {
    dispatch({
      [RSAA]: {
        endpoint: 'https://blooming-cove-33093.herokuapp.com/food-shop/products',
        method: 'GET',
        types: [GET_PRODUCTS_START, GOT_PRODUCTS, GET_PRODUCTS_ERROR]
      }
    });
  };
};

export {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  GET_PRODUCTS_ERROR,
  SET_CART_QUANTITY,
  getProducts,
};
