import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import City from './City';
import cityService from '../services/city';
import weatherService from '../services/weather';
import {
  sortAlphabetically,
  readFromStorage,
  saveToStorage,
} from '../utils/helperFunctions';

const Cities = () => {
  const [cities, setCities] = useState(readFromStorage('cities') || []);

  useEffect(() => {
    (async function () {
      try {
        const cities = await cityService.getCities();
        const sortedCities = cities
          .slice(0, 15)
          .map((city) => city.Name)
          .sort(sortAlphabetically);
        const promisifiedCities = sortedCities.map((city) =>
          weatherService.getWeatherData(city)
        );
        const citiesWithData = await Promise.all(promisifiedCities);
        if (citiesWithData.includes(null)) {
          return readFromStorage('cities');
        }
        saveToStorage('cities', citiesWithData);
        setCities(citiesWithData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const removeCity = (evt, name) => {
    evt.stopPropagation();
    const filteredCities = cities.filter((city) => city.location.name !== name);
    setCities(filteredCities);
  };

  return (
    <div className="cities">
      {cities.map((city) => (
        <City key={uuidv4()} city={city} removeCity={removeCity} />
      ))}
    </div>
  );
};

export default Cities;
