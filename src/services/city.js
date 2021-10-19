import axios from 'axios';

const URI =
  'https://gist.githubusercontent.com/Olowotemple/5846eca70a568b89b2b77103ed4d388b/raw/8762a7f1feba4eeb05fa8faa0bddfb42a2206641/cities.json';

const getCities = async (source) => {
  const apiResponse = await axios.get(URI, { cancelToken: source.token });
  return apiResponse.data;
};

const cityService = {
  getCities,
};

export default cityService;
