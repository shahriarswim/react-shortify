import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import fetchUrl from '../../api/fetchUrl';
import DisplayShortUrl from '../DisplayShortUrl/DisplayShortUrl';

import './Input.css';

const Input = () => {
  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const shortIt = async (event) => {
    event.preventDefault();

    try {
      if (!url) {
        throw new Error('Url Needed!');
      }

      const fetchData = await fetchUrl(slug, url);
      setResponseData(fetchData);

      setSlug('');
      setUrl('');
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div>
          <input
            className="container__input"
            type="text"
            placeholder="slug (optional)"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
        </div>
        <div>
          <input
            className="container__input"
            type="text"
            placeholder="url (must)"
            required
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <div>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <button
              className="container__btn"
              type="submit"
              onClick={(event) => {
                if (url) {
                  setIsLoading(true);
                  shortIt(event);
                }
              }}
            >
              Shortify
            </button>
          )}
        </div>
      </div>

      <DisplayShortUrl responseData={responseData.slug} />
    </div>
  );
};

export default Input;
