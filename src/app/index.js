import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import Loader from './components/Loader';
import { Home, Favourites, Cart } from './pages';
import FakeEShopNav from './components/FakeEShopNav';

function AppHooked({
  loading,
  error,
}) {
  const routes = (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/favourites">
        <Favourites />
      </Route>
      <Route path="*">
        404
      </Route>
    </Switch>
  );

  return (
    <BrowserRouter>
      <FakeEShopNav />
      {loading ? <Loader /> : (
        error ? <p>{error}</p> : routes
      )}
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    loading: state.products.loading,
    error: state.products.error,
  };
}

export default connect(
  mapStateToProps
)(AppHooked);
