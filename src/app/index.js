import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
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

function AppHooked() {
  const [products, loading, error] = useProducts();
  const {
    products: cartProducts,
    addToList: handleAddCart,
  } = useProductList([]);
  const {
    products: favouriteProducts,
    addToList: handleAddFavourites,
  } = useProductList([]);

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
              <Home products={products} onAddCart={handleAddCart} onAddFavourites={handleAddFavourites} />
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

export default AppHooked;