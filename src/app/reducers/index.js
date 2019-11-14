import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  SET_CART_QUANTITY,
  GET_PRODUCTS_ERROR
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
    case SET_CART_QUANTITY: {
      const { productId, quantity } = action;
      if (quantity < 0) {
        return state;
      } else {
        const newState = {
          ...state,
          productToQuantity: {
            ...state.productToQuantity,
            [productId]: quantity
          }
        };
        return newState;
      }
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
    case GET_PRODUCTS_ERROR:
        return { ...state, error: 'Oh no! Something went wrong!', loading: false };
    case GOT_PRODUCTS:
      return {...state, products: action.payload, loading: false};
    default:
      return state;
  }
}

export default {
  products,
  cartProducts,
  favouriteProducts
};
