import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { Home } from './pages';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    products: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const result = await fetch('https://boiling-reaches-93648.herokuapp.com/food-shop/products');
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

  render() {
    const { error, loading, products } = this.state;

    if (loading) {
      return <Loader type="TailSpin" />;
    }

    return (
      <div>
        {error && <p>{error}</p>}
        <Home products={products} />
      </div>
    );
  }
}

export default App;
