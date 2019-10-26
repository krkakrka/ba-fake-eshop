import React from 'react';
import {
  Link
} from "react-router-dom";
import './index.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

function FakeEShopNav({ products, cartProducts, favouriteProducts }) {
  return (
    <nav className="FakeEShopNav">
      <Link to="/" className="FakeEShopNav__eshop-link">{`Home (${products.length})`}</Link>
      <Link to="/cart" className="FakeEShopNav__eshop-link">{`Cart (${cartProducts.length})`}</Link>
      <Link to="/favourites" className="FakeEShopNav__eshop-link">{`Favourites (${favouriteProducts.length})`}</Link>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    cartProducts: state.cartProducts,
    favouriteProducts: state.favouriteProducts
  };
}

const enhance = compose(
  connect(
    mapStateToProps
  ),
  withRouter,
);

export default enhance(FakeEShopNav);
