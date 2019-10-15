import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Home } from './pages';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    products: [],
    cartProducts: [],
    favouriteProducts: [],
  };

  async componentDidMount() {
    window.onpopstate = () => this.forceUpdate();

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

  handleLinkClick(event) {
    event.preventDefault();
    const path = event.target.attributes.getNamedItem('href').nodeValue;
    window.history.pushState(null, null, path);
    this.forceUpdate();
  }

  render() {
    const { error, loading, products, cartProducts, favouriteProducts } = this.state;

    if (loading) {
      return <Loader type="TailSpin" />;
    }

    switch(window.location.pathname) {
      case '/':
        return (
          <div>
            <ul>
              <li><a href="/" onClick={this.handleLinkClick.bind(this)}>Home</a></li>
              <li><a href="/cart" onClick={this.handleLinkClick.bind(this)}>Cart</a></li>
              <li><a href="/favourites" onClick={this.handleLinkClick.bind(this)}>Favourites</a></li>
            </ul>
            {error && <p>{error}</p>}
            <Home products={products} onAddCart={console.log} />
          </div>
        );
      case '/cart':
        return <Home products={cartProducts} />;
      case '/favourites':
        return <Home products={favouriteProducts} />;
      default:
        return 404;
    }
  }
}

export default App;
