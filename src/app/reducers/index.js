import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_END
} from '../actions';

const INITIAL_PRODUCTS_STATE = {
  products: [],
  loading: true,
  error: undefined
};

const INITIAL_CART_PRODUCTS_STATE = {
  products: [],
  productToQuantity: {},
}

function productExists(products, product) {
  return products.find(p => p.id === product.id);
}

function cartProducts(state = INITIAL_CART_PRODUCTS_STATE, action) {
  switch(action.type) {
    case ADD_TO_CART:
      if (!productExists(state.products, action.product)) {
        return {
          ...state,
          products: [...state.products, action.product],
        };
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

export default {
  products,
  cartProducts,
  favouriteProducts
};