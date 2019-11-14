import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import {
  MemoryRouter,
  BrowserRouter
} from "react-router-dom";
import { act } from "react-dom/test-utils";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { ProductCard } from './index';
import ContainerProductCard from './index';
import { SET_CART_QUANTITY } from '../../actions';

describe.only('ProductCard', () => {
  const mockProduct = { name: 'name', image: 'imgUrl', price: '1', currencySymbol: '$', id: 'prodId' }
  const mockLocation = { patname: '/root' };
  const mockCartProducts = { productToQuantity: { a: 5 } };
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should render correct snapshot', () => {
    act(() => {
      const el = <ProductCard
        product={mockProduct}
        location={mockLocation}
        cartProducts={mockCartProducts}
      />;
      render(el, container);
    })
    expect(container.innerHTML).toMatchSnapshot();
  });
});
