import React from 'react';

import './DisplayShortUrl.css';

const DisplayShortUrl = ({ responseData }) => {
  if (responseData) {
    return (
      <div className="shortLink">
        <h1 className="shortLink__heading">Shorten URL:</h1>
        <a
          className="shortLink__link"
          href={`https://shorti-fy.herokuapp.com/${responseData}`}
        >
          {`https://shorti-fy.herokuapp.com/${responseData}`}
        </a>
      </div>
    );
  } else {
    return null;
  }
};

export default DisplayShortUrl;
