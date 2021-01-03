import constants from '@/stores/dynamic-config/constants';
import state from '@/stores/dynamic-config/state';
import effects from '@/stores/dynamic-config/effects';
import reducers from '@/stores/dynamic-config/reducers';

export default {
  namespace: constants.NS_DYNAMIC_CONFIG,
  state,
  effects,
  reducers,
};
