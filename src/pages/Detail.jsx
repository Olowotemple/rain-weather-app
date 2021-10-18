import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../components/Logo';
import weatherService from '../services/weather';

const Detail = () => {
  const [detail, setDetail] = useState({});
  const { city: cityName } = useParams();

  useEffect(() => {
    (async function () {
      try {
        const detail = await weatherService.getWeatherData(cityName);
        setDetail(detail);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="detail">
      <Logo />
    </div>
  );
};

export default Detail;
