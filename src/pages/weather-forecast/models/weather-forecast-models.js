import constants from '@/stores/weather-forecast/constants';
import state from '@/stores/weather-forecast/state';
import effects from '@/stores/weather-forecast/effects';
import reducers from '@/stores/weather-forecast/reducers';

export default {
  namespace: constants.NS_WEATHER_FORECAST,
  state,
  effects,
  reducers,
};
