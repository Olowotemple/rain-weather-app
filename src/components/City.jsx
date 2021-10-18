import { Link } from 'react-router-dom';
import { ReactComponent as CancelButton } from '../svg/cancelButton.svg';

const City = ({ city, removeCity }) => {
  const { name } = city.location;
  const { temperature, weather_descriptions } = city.current;
  const weatherDescription = weather_descriptions[0];

  return (
    <div
      className={`city city--${
        temperature < 20 ? 'cold' : temperature > 25 ? 'hot' : 'warm'
      }`}
    >
      <Link to={`/${name}`}>
        <h3 className="city__name">{name}</h3>
        <p className="city__temp">{temperature}&deg;C</p>
        <div className="city__temp__desc">{weatherDescription}</div>
      </Link>

      <button className="city__remove" onClick={(evt) => removeCity(evt, name)}>
        <CancelButton />
      </button>
    </div>
  );
};

export default City;
