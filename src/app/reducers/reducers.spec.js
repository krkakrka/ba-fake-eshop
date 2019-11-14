import reducers from './index';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  SET_CART_QUANTITY,
  GET_PRODUCTS_ERROR
} from '../actions';

describe('products reducer', () => {
  test('initialized with correct initial state', async () => {
    const expectedState = { products: [], loading: true, error: undefined };
    const nextState = reducers.products(undefined, { type: 'nothing' });
    expect(expectedState).toStrictEqual(nextState);
    // throw new Error('nop');
    // return false;
  });
});

describe('cart products reducer', () => {
  it('shouldnt have quantity less than 0', () => {
    const productId = '1234';
    const initialState = {
      productToQuantity: {
        [productId]: 0
      }
    };
    const action = { type: SET_CART_QUANTITY, productId, quantity: '-1' };
    const nextState = reducers.cartProducts(initialState, action);
    expect(nextState.productToQuantity[productId]).toBe(0);
  });

  it('shouldnt set product quantity', () => {
    const productId = 'productId';
    const initialState = {
      productToQuantity: {
        [productId]: 0
      }
    };
    const action = { type: SET_CART_QUANTITY, productId, quantity: '-1' };
    const nextState = reducers.cartProducts(initialState, action);
    expect(nextState.productToQuantity[productId]).toBe(0);
  });
});
