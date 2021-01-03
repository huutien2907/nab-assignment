import constants from './constants';

const currentLocationWeatherData = (payload) => ({
  type: `${constants.NS_WEATHER_FORECAST}/${constants.CURRENT_LOCATION_WEATHER_DATA}`,
  payload,
});

const getQueryLocation = (payload) => ({
  type: `${constants.NS_WEATHER_FORECAST}/${constants.GET_QUERY_LOCATION}`,
  payload,
});

const setQueryLocation = (payload) => ({
  type: `${constants.SET_QUERY_LOCATION}`,
  payload,
});

const getWeatherData = (payload) => ({
  type: `${constants.NS_WEATHER_FORECAST}/${constants.GET_WEATHER_DATA}`,
  payload,
});

const setWeatherData = (payload) => ({
  type: `${constants.SET_WEATHER_DATA}`,
  payload,
});

const clearReduxData = () => ({
  type: `${constants.NS_WEATHER_FORECAST}/${constants.CLEAR_REDUX_DATA}`,
});

export default {
  currentLocationWeatherData,
  getQueryLocation,
  setQueryLocation,
  getWeatherData,
  setWeatherData,
  clearReduxData,
};
