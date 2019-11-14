import React, { useEffect, useState } from 'react';
import './index.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  ADD_TO_CART,
  ADD_TO_FAVOURITES,
  SET_CART_QUANTITY,
} from '../../actions';

export function ProductCard(props) {
  const { name, image, price, id, currencySymbol } = props.product;
  const { pathname } = props.location;
  const { addToCart, addToFavourites, setCartQuantity } = props;
  const { productToQuantity } = props.cartProducts;
  const quantity = productToQuantity[id] || 0;

  const textInputRef = React.createRef();

  const [textValue, setTextValue] = useState('');

  return (
    <div className="ProductCard" id={id}>

      <form onSubmit={(e) => { e.preventDefault(); e.persist(); console.log(textInputRef.current.value) }}>
        <label>
          Name:
          <input type="text" name="name"
            value={textValue}
            ref={textInputRef}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

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
