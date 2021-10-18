import axios from 'axios';

const { REACT_APP_WEATHERSTACK_API_KEY } = process.env;
const baseURI = 'https://api.weatherstack.com/autocomplete';

const getSearchLocation = async (search, source) => {
  const queryURI = `${baseURI}?access_key=${REACT_APP_WEATHERSTACK_API_KEY}&query=${search}`;
  const apiResponse = await axios.get(queryURI, { cancelToken: source.token });
  return apiResponse.data;
};

const locationService = {
  getSearchLocation,
};

export default locationService;
