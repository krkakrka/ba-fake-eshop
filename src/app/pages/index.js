import { connect } from 'react-redux';
import ProductCardGrid from '../components/ProductCardGrid';

const Home = connect(
  state => ({ products: state.products.products })
)(ProductCardGrid);

const Cart = connect(
  state => ({ products: state.cartProducts.products })
)(ProductCardGrid);

const Favourites = connect(
  state => ({ products: state.favouriteProducts })
)(ProductCardGrid);

export { Home, Cart, Favourites };
