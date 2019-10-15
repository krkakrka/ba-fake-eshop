import React from 'react';
import './index.scss';
import { ProductCard } from '../../components';

function Home({ products, onAddCart }) {
  return (
    <div className="Home">
      {!products.length && <p>Sorry, no products</p>}
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          onAddCart={() => onAddCart(product)}
        />
      ))}
    </div>
  );
}

Home.defaultProps = {
  onAddCart: (x) => (x)
};

export default Home;
