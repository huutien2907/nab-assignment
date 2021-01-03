import constants from './constants';
import actions from './actions';
import services from '@/services/weather-forecast';
import _isEmpty from 'lodash/isEmpty';

const effects = {
  *[constants.CURRENT_LOCATION_WEATHER_DATA]({ payload }, { call, put }) {
    const response = yield call(services.getCurrentLocationWeatherData, payload);
    const nearestLocation = response.find(
      (r) =>
        r.distance ===
        Math.min.apply(
          null,
          response.map((res) => res.distance),
        ),
    );
    if (!_isEmpty(nearestLocation)) {
      const weatherData = yield call(services.getWeatherData, nearestLocation.woeid);
      yield put(actions.setWeatherData(weatherData));
    }
  },
  *[constants.GET_QUERY_LOCATION]({ payload }, { call, put }) {
    const response = yield call(services.queryLocation, payload);
    yield put(actions.setQueryLocation(response));
  },

  *[constants.GET_WEATHER_DATA]({ payload }, { call, put }) {
    const response = yield call(services.getWeatherData, payload);
    yield put(actions.setWeatherData(response));
  },
};

export default effects;
