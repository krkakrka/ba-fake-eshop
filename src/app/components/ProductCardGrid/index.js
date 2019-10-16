import React from 'react';
import './index.scss';
import { ProductCard } from '..';

function ProductCardGrid({ products, onAddCart, onAddFavourites }) {
  return (
    <div className="Home">
      {!products.length && <p>Sorry, no products</p>}
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          onAddCart={() => onAddCart(product)}
          onAddFavourites={() => onAddFavourites(product)}
        />
      ))}
    </div>
  );
}

export default ProductCardGrid;
