import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Home } from './pages';
import { nullLiteral } from '@babel/types';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    products: [],
    cartProducts: [],
    favouriteProducts: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const result = await fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products');
      const json = await result.json();

      if (result.ok) {
        this.setState({ products: json });
      } else {
        throw new Error('Failed response');
      }
    } catch (error) {
      this.setState({ error: 'Oh no! Error!' });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleAddCart(product) {
    const foundProduct = this.state.cartProducts.find(p => p.id === product.id);
    if (!foundProduct) {
      this.setState({
        cartProducts: this.state.cartProducts.concat(product),
      });
    }
  }

  render() {
    const { error, loading, products, cartProducts, favouriteProducts } = this.state;

    if (loading) {
      return <Loader type="TailSpin" />;
    }

    return null;
  }
}

function AppHooked() {
  const error = '';
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const handleAddCart = (product) => {
    const foundProduct = cartProducts.find(p => p.id === product.id);
    if (!foundProduct) {
      setCartProducts(cartProducts.concat(product));
    }
  };

  useEffect(() => {
    fetch('https://blooming-cove-33093.herokuapp.com/food-shop/products')
    .then(result => {
      return result.json();
    })
    .then(products => setProducts(products));
  }, []);


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/favourites">Favourites</Link></li>
            </ul>
            {error && <p>{error}</p>}
            <Home products={products} onAddCart={handleAddCart} />
          </div>
        </Route>
        <Route path="/cart">
          <Home products={cartProducts} />
        </Route>
        <Route path="/favourites">
          <Home products={favouriteProducts} />
        </Route>
        <Route path="*">
          404
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

// export default App;
export default AppHooked;