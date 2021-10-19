import { createContext, useContext, useState } from 'react';
import { readFromStorage, saveToStorage } from '../utils/helperFunctions';

const FavouriteContext = createContext(null);

export const FavouriteContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(
    readFromStorage('favourites') || []
  );

  const addToFavourite = (name) => {
    const favourite = [...favourites, name];
    saveToStorage('favourites', favourite);
    setFavourites(favourite);
  };

  const removeFromFavourite = (name) => {
    const filteredFavourites = favourites.filter((fav) => fav !== name);
    saveToStorage('favourites', filteredFavourites);
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
