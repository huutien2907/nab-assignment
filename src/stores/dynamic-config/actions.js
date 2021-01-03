import constants from './constants';

const getConfig = () => ({
  type: `${constants.NS_DYNAMIC_CONFIG}/${constants.GET_CONFIG}`,
});

const setConfig = (payload) => ({
  type: constants.SET_CONFIG,
  payload,
});

export default {
  getConfig,
  setConfig,
};
