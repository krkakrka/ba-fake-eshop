import React from 'react';
import './index.scss';

function ProductCard({ name, image, price, id, currencySymbol, onAddCart }) {
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
        <button onClick={onAddCart}>Add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
