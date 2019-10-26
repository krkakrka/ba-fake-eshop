import React from 'react';
import './index.scss';
import ProductCard from '../ProductCard';

function ProductCardGrid({ products }) {
  return (
    <div className="Home">
      {!products.length && <p>Sorry, no products</p>}
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductCardGrid;
