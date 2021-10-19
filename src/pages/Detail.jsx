import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';
import CityWeatherData from '../components/CityWeatherData';
import Notes from '../components/Notes';
import weatherService from '../services/weather';
import {
  formatUtcOffset,
  readFromStorage,
  saveToStorage,
} from '../utils/helperFunctions';
import CityDetails from '../components/CityDetails';
import Loading from '../components/Loading';

const Detail = () => {
  const [details, setDetails] = useState(readFromStorage('details') || []);
  const { city: cityName } = useParams();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    (async function () {
      try {
        const detail = await weatherService.getWeatherData(
          cityName,
          cancelTokenSource
        );
        const filteredDetails = details.filter(
          (detail) => detail.location.name !== cityName
        );
        const newDetails = [detail, ...filteredDetails];
        if (detail) {
          saveToStorage('details', newDetails);
          setDetails(newDetails);
        }
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [cityName, details]);

  const detail =
    details.find((detail) => detail.location.name === cityName) || {};

  if (Object.keys(detail).length) {
    const { request, location, current } = detail;
    const { name, localtime: localTime, utc_offset } = location;
    const { query } = request;
    const utcOffset = formatUtcOffset(utc_offset);

    return (
      <div className="detail">
        <Logo />

        <CityDetails
          name={name}
          query={query}
          localTime={localTime}
          utcOffset={utcOffset}
        />

        <section className="city__data">
          <CityWeatherData current={current} />
          <Notes cityName={cityName} />
        </section>
      </div>
    );
  }
  return <Loading />;
};

export default Detail;
