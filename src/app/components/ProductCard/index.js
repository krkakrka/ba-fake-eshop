import React from 'react';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
} from '../../actions';

function ProductCard(props) {
  const { name, image, price, id, currencySymbol } = props.product;
  const { pathname } = props.location;
  const { addToCart, addToFavourites } = props;

  return (
    <div className="ProductCard" id={id}>
      <div className="ProductCard__image-wrapper">
        <img src={image} alt={`${name} product`} />
      </div>
      <div className="ProductCard__info">
        <h3>{name}</h3>
        <p className="ProductCard__info-price">
          {price}
          {currencySymbol}
        </p>
        {pathname !== '/cart' && <button onClick={() => addToCart(props.product)}>Add to cart</button>}
        {pathname !== '/favourites' && <button onClick={() => addToFavourites(props.product)}>Add to favourites</button>}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: (product) => dispatch({ type: ADD_TO_CART, product }),
    addToFavourites: (product) => dispatch({ type: ADD_TO_FAVOURITES, product }),
  };
}

const enhance = compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  withRouter,
);

export default enhance(ProductCard);
