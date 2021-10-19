import { useFavouriteContext } from '../contexts/FavouriteContext';
import { ReactComponent as RemoveFromFavouriteIcon } from '../svg/removeFromFavourites.svg';
import { ReactComponent as AddToFavouriteIcon } from '../svg/addToFavourites.svg';

const CityDetails = ({ name, query, localTime, utcOffset }) => {
  const { favourites, addToFavourite, removeFromFavourite } =
    useFavouriteContext();

  const handleFavouriteAction = (evt, name) => {
    evt.stopPropagation();
    const basis = evt.target.getAttribute('aria-label');
    if (basis === 'add to favourites') {
      return addToFavourite(name);
    }
    removeFromFavourite(name);
  };

  return (
    <section className="city-details">
      <h1 className="city-details__name">
        {name}{' '}
        <button
          className={`city__action ${
            favourites.includes(name)
              ? 'city__action--remove'
              : 'city__action--add'
          }`}
          onClick={(evt) => handleFavouriteAction(evt, name)}
        >
          {favourites.includes(name) ? (
            <RemoveFromFavouriteIcon />
          ) : (
            <AddToFavouriteIcon />
          )}
        </button>
      </h1>
      <p className="city-details__fullname">{query}</p>
      <p className="city-details__localtime">
        {new Date(localTime).toLocaleTimeString('en-US')}
      </p>
      <p className="city-details__timezone">{`GMT${utcOffset}`}</p>
    </section>
  );
};

export default CityDetails;
