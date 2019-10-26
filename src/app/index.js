import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Home, Favourites, Cart } from './pages';
import {
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_END
} from './actions';
import FakeEShopNav from './components/FakeEShopNav';

function AppHooked({
  products,
  loading,
  error,
  getProductsStarted,
  gotProducts,
  getProductsError,
  getProductsEnd,
}) {
  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    getProductsStarted();

    fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products')
      .then(result => result.json())
      .then(products => gotProducts(products))
      .catch(() => getProductsError())
      .finally(() => getProductsEnd());
  }, []);

  return (
    <BrowserRouter>
      <FakeEShopNav />
      {loading && <Loader type="TailSpin" />}
      {error ? <p>{error}</p> :
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
      }
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

function mapDispatchToProps(dispatch) {
  return {
    getProductsStarted: () => dispatch({ type: GET_PRODUCTS_START }),
    gotProducts: (products) => dispatch({ type: GOT_PRODUCTS, products }),
    getProductsError: () => dispatch({ type: GET_PRODUCTS_ERROR }),
    getProductsEnd: () => dispatch({ type: GET_PRODUCTS_END })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHooked);
