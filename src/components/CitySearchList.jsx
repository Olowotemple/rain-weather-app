import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import locationService from '../services/location';

const CitySearchList = ({ search }) => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    /*
      because of the way this component is setup (it only gets to the DOM if search exists),
      and as such if user erases the search term fast enough,
      there would be batched useEffect calls even after the component has unmounted to handle that,
      we cancel the request before the component unmounts using the cleanup of useEffect.
    */

    const cancelTokenSource = axios.CancelToken.source();

    (async function () {
      try {
        const { results } = await locationService.getSearchLocation(
          search,
          cancelTokenSource
        );
        setSearchResult((prevSearchResult) => {
          if (results) {
            return results;
          }
          return prevSearchResult;
        });
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }
        console.error(err);
      }
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [search]);

  if (searchResult.length > 10) {
    return (
      <p className="city-search-list city-search-list--excessive">
        Too many cities, please be more specific
      </p>
    );
  }

  if (searchResult.length === 0 && search) {
    return (
      <p className="city-search-list city-search-list--not-found">
        {search} not found...
      </p>
    );
  }

  return (
    <ul className="city-search-list city-search-list--list">
      {searchResult.map((result) => (
        <li key={uuidv4()}>
          <Link
            to={`/${result.name}`}
          >{`${result.name}, ${result.country}`}</Link>
        </li>
      ))}
    </ul>
  );
};

export default CitySearchList;
