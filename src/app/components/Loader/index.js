import React from 'react';
import ReactLoader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './index.scss';

function Loader() {
  return (
    <div className="Loader__container">
      <ReactLoader type="TailSpin" />
    </div>
  );
}

export default Loader;