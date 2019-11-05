import React from 'react';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  SET_CART_QUANTITY,
} from '../../actions';

function ProductCard(props) {
  const { name, image, price, id, currencySymbol } = props.product;
  const { pathname } = props.location;
  const { addToCart, addToFavourites, setCartQuantity } = props;
  const { productToQuantity } = props.cartProducts;
  const quantity = productToQuantity[id] || 0;

  return (
    <div className="ProductCard" id={id}>
      <div className="ProductCard__image-wrapper">
        <img src={image} alt={`${name} product`} />
      </div>
      <div className="ProductCard__info">
        <div>
          <h3>{name}</h3>
          <p className="ProductCard__info-price">
            {price}
            {currencySymbol}
          </p>
        </div>
        <div className="ProductCard__buttons-container">
          {pathname !== '/cart' && <button onClick={() => addToCart(props.product)}>Add to cart</button>}
          {pathname !== '/favourites' && <button onClick={() => addToFavourites(props.product)}>Add to favourites</button>}
          <button onClick={() => setCartQuantity(id, quantity + 1)}>+</button>
          <button onClick={() => setCartQuantity(id, quantity - 1)}>-</button>
          <p>Quantity: {quantity}</p>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cartProducts: state.cartProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART, product }),
    addToFavourites: (product) => dispatch({ type: ADD_TO_FAVOURITES, product }),
    setCartQuantity: (productId, quantity) => dispatch({ type: SET_CART_QUANTITY, productId, quantity }),
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
);

export default enhance(ProductCard);
