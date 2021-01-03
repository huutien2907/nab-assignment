import constants from './constants';

const reducers = {
  [constants.SET_CONFIG](state, { payload }) {
    return {
      ...state,
      data: payload,
    };
  },
};

export default reducers;
