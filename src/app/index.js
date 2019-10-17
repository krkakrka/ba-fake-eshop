import React, { useEffect, useState } from 'react';
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

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products')
    .then(result => {
      return result.json();
    })
    .then(products => setProducts(products))
    .catch(() => setError('Oh no! Error!'))
    .finally(() => setLoading(false));
  }, []);

  return [products, loading, error];
}

function useProductList(initialList) {
  const [products, setProducts] = useState(initialList);

  const addToList = (product) => {
    const foundProduct = products.find(p => p.id === product.id);
    if (!foundProduct) {
      setProducts(products.concat(product));
    }
  };

  return { products, addToList };
}

function AppHooked({ products, loading, error, cartProducts, favouriteProducts, addToCart, addToFavourites }) {
  // const [products, loading, error] = useProducts();
  // const {
  //   products: cartProducts,
  //   addToList: handleAddCart,
  // } = useProductList([]);
  // const {
  //   products: favouriteProducts,
  //   addToList: handleAddFavourites,
  // } = useProductList([]);

  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/favourites">Favourites</Link></li>
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
    addToCart: (product) => dispatch({ type: 'addToCart', product }),
    addToFavourites: (product) => dispatch({ type: 'addToFavourites', product }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHooked);
