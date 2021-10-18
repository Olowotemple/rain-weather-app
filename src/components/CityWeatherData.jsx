import CityWeatherDatum from './CityWeatherDatum';
import { ReactComponent as ThermometerIcon } from '../svg/weather/thermometer.svg';
import { ReactComponent as WindIcon } from '../svg/weather/wind.svg';
import { ReactComponent as WindDirIcon } from '../svg/weather/windDirection.svg';
import { ReactComponent as PressureIcon } from '../svg/weather/pressure.svg';
import { ReactComponent as HumidityIcon } from '../svg/weather/humidity.svg';
import { ReactComponent as FeelsLikeIcon } from '../svg/weather/feelsLike.svg';
import { ReactComponent as UvIndexIcon } from '../svg/weather/uvIndex.svg';
import { ReactComponent as VisibilityIcon } from '../svg/weather/visibility.svg';

const CityWeatherData = ({ current }) => {
  const {
    temperature,
    wind_speed: windSpeed,
    wind_degree: windDegree,
    wind_dir: windDirection,
    pressure,
    humidity,
    feelslike: feelsLike,
    uv_index: uvIndex,
    visibility,
  } = current;

  return (
    <div className="city-weather-data">
      <CityWeatherDatum
        Icon={ThermometerIcon}
        desc="temperature"
        data={temperature}
        unit="&deg;C"
      />

      <CityWeatherDatum
        Icon={WindIcon}
        desc="wind  speed"
        data={windSpeed}
        unit="km/h"
      />

      <CityWeatherDatum
        Icon={WindDirIcon}
        desc="wind"
        data={`${windDegree} ${windDirection}`}
      />

      <CityWeatherDatum
        Icon={PressureIcon}
        desc="pressure"
        data={pressure}
        unit="hPa"
      />

      <CityWeatherDatum
        Icon={HumidityIcon}
        desc="humidity"
        data={humidity}
        unit="%"
      />

      <CityWeatherDatum
        Icon={FeelsLikeIcon}
        desc="feels like"
        data={feelsLike}
        unit="&deg;C"
      />

      <CityWeatherDatum Icon={UvIndexIcon} desc="uv index" data={uvIndex} />
      <CityWeatherDatum
        Icon={VisibilityIcon}
        desc="visibility"
        data={visibility}
      />
    </div>
  );
};

export default CityWeatherData;
