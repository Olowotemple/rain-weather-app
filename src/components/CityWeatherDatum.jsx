const CityWeatherDatum = ({ Icon, desc, data, unit }) => {
  return (
    <div className="city-weather-datum">
      <div className="city-weather-datum__header">
        <Icon />
        <div className="city-weather-datum__desc">{desc}</div>
      </div>
      <div className="city-weather-datum__main">
        {data}
        {unit && <span className="city-weather-datum__unit">{unit}</span>}
      </div>
    </div>
  );
};

export default CityWeatherDatum;
