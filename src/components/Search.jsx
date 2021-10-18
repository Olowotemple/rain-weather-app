import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../svg/search.svg';
import CitySearchList from './CitySearchList';

const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="search">
      <div className="search__control">
        <SearchIcon />
        <input
          type="text"
          value={search}
          placeholder="search city"
          className="search__input"
          onChange={(evt) => setSearch(evt.target.value)}
        />
      </div>
      {search && <CitySearchList search={search} />}
    </div>
  );
};

export default Search;
