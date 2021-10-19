import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Logo';
import Notes from '../components/Notes';
import CityDetails from '../components/CityDetails';
import Loading from '../components/Loading';
import CityWeatherData from '../components/CityWeatherData';
import Notification from '../components/Notification';
import weatherService from '../services/weather';
import {
  formatUtcOffset,
  readFromStorage,
  saveToStorage,
} from '../utils/helperFunctions';

const Detail = () => {
  const [details, setDetails] = useState(readFromStorage('details') || []);
  const [notification, setNotification] = useState(null);
  const { city } = useParams();
  const cityName = city.slice(0, 1).toUpperCase() + city.slice(1); // match case of the API

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    (async function () {
      try {
        const detail = await weatherService.getWeatherData(
          cityName,
          cancelTokenSource
        );
        setDetails((prevDetails) => {
          const filteredDetails = prevDetails.filter(
            (detail) => detail.location.name !== cityName
          );
          const newDetails = [detail, ...filteredDetails];
          if (detail) {
            saveToStorage('details', newDetails);
            return newDetails;
          }
        });
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      cancelTokenSource.cancel();
    };
  }, [cityName]);

  const detail =
    details.find((detail) => detail.location.name === cityName) || {};

  if (Object.keys(detail).length) {
    const { request, location, current } = detail;
    const { name, localtime: localTime, utc_offset } = location;
    const { query } = request;
    const utcOffset = formatUtcOffset(utc_offset);

    return (
      <div className="detail">
        <Notification notification={notification} />
        <Logo />

        <CityDetails
          name={name}
          query={query}
          localTime={localTime}
          utcOffset={utcOffset}
          setNotification={setNotification}
        />

        <section className="city__data">
          <CityWeatherData current={current} />
          <Notes cityName={cityName} setNotification={setNotification} />
        </section>
      </div>
    );
  }
  return <Loading />;
};

export default Detail;
