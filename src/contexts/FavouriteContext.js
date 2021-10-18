import { createContext, useContext, useState } from 'react';

const FavouriteContext = createContext(null);

export const FavouriteContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourite = (name) => {
    const favourite = [...favourites, name];
    setFavourites(favourite);
  };

  const removeFromFavourite = (name) => {
    const filteredFavourites = favourites.filter((fav) => fav !== name);
    setFavourites(filteredFavourites);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, setFavourites, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavouriteContext = () => useContext(FavouriteContext);
