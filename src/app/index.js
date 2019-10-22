import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Home, Favourites, Cart } from './pages';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  GET_PRODUCTS_START,
  GOT_PRODUCTS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_END
} from './actions';

function AppHooked({
  products,
  loading,
  error,
  cartProducts,
  favouriteProducts,
  addToCart,
  addToFavourites,
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
      <ul>
        <li><Link to="/">{`Home (${products.length})`}</Link></li>
        <li><Link to="/cart">{`Cart (${cartProducts.length})`}</Link></li>
        <li><Link to="/favourites">{`Favourites (${favouriteProducts.length})`}</Link></li>
      </ul>
      {loading && <Loader type="TailSpin" />}
      {error ? <p>{error}</p> :
        <Switch>
          <Route exact path="/">
            <div>
              <Home products={products} onAddCart={addToCart} onAddFavourites={addToFavourites} />
            </div>
          </Route>
          <Route path="/cart">
            <Cart products={cartProducts} />
          </Route>
          <Route path="/favourites">
            <Favourites products={favouriteProducts} />
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
    products: state.products,
    loading: state.loading,
    error: state.error,
    cartProducts: state.cartProducts,
    favouriteProducts: state.favouriteProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART, product }),
    addToFavourites: (product) => dispatch({ type: ADD_TO_FAVOURITES, product }),
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
