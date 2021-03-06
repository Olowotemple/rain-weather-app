import axios from 'axios';

const { REACT_APP_WEATHERSTACK_API_KEY } = process.env;
const baseURI = 'https://api.weatherstack.com/current';

const getWeatherData = async (city, source) => {
  const queryURI = `${baseURI}?access_key=${REACT_APP_WEATHERSTACK_API_KEY}&query=${city}`;
  let apiResponse;
  if (source) {
    apiResponse = await axios.get(queryURI, { cancelToken: source.token });
  } else {
    apiResponse = await axios.get(queryURI);
  }
  return apiResponse.data;
};

const weatherService = {
  getWeatherData,
};

export default weatherService;
