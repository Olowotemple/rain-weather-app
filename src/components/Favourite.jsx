import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useFavouriteContext } from '../contexts/FavouriteContext';
import { sortAlphabetically } from '../utils/helperFunctions';
import { ReactComponent as FavouriteCityIcon } from '../svg/favourites.svg';

const Favourite = () => {
  const { favourites } = useFavouriteContext();

  const sortedFavourites = favourites.sort(sortAlphabetically);

  if (sortedFavourites.length) {
    return (
      <section className="favourite">
        <h2 className="favourite__desc">
          Your favourite Cities <FavouriteCityIcon />
        </h2>
        <div className="favourite__cities">
          {sortedFavourites.map((fav) => (
            <Link to={`/${fav}`} key={uuidv4()} className="favourite__city">
              {fav}
            </Link>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section className="favourite">
      <h2 className="favourite__desc">
        Your favourite Cities <FavouriteCityIcon />
      </h2>
      <p className="favourite__none">visit a city to add to favourites...</p>
    </section>
  );
};

export default Favourite;
