import React from 'react';
import {
  Link
} from "react-router-dom";
import './index.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const EShopLink = withRouter(
  ({ to, children, location }) => {
    const defaultClassName = 'FakeEShopNav__eshop-link';
    const activeClassName = `${defaultClassName}-active`;
    const className = `${defaultClassName} ${to === location.pathname ? activeClassName: '' }`;
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
);

function FakeEShopNav({ products, cartProducts, favouriteProducts, location }) {
  return (
    <nav className="FakeEShopNav">
      <EShopLink to="/">{`Home (${products.length})`}</EShopLink>
      <EShopLink to="/cart">{`Cart (${cartProducts.length})`}</EShopLink>
      <EShopLink to="/favourites">{`Favourites (${favouriteProducts.length})`}</EShopLink>
    </nav>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    cartProducts: state.cartProducts.products,
    favouriteProducts: state.favouriteProducts
  };
}

export default connect(mapStateToProps)(FakeEShopNav);
