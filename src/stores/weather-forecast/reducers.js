import constants from './constants';
import initialState from './state';

const reducers = {
  [constants.SET_QUERY_LOCATION](state, { payload }) {
    return state.set('queryLocation', payload);
  },
  [constants.SET_WEATHER_DATA](state, { payload }) {
    return state.set('weatherData', payload);
  },
  [constants.CLEAR_REDUX_DATA]() {
    return initialState;
  },
};

export default reducers;
