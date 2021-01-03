import constants from './constants';
import request from '@/utils/request';
import { requestGetParams } from '@/utils/utils';
import actions from './actions';

const getConfigServices = async () => {
  const url = `${BASE_PATH}config.json`;
  const requestParams = requestGetParams();
  return request(url, requestParams);
};

const effects = {
  *[constants.GET_CONFIG](_, { call, put }) {
    const response = yield call(getConfigServices);
    yield put(actions.setConfig(response));
  },
};

export default effects;
