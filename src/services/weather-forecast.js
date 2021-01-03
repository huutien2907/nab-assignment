import request from '@/utils/request';
import { requestGetParams, getDynamicConfig } from '@/utils/utils';

const getCurrentLocationWeatherData = async (params) => {
  const { DEVELOPMENT_CORS_CROSS, APPLICATION_API } = getDynamicConfig();
  const { latitude, longitude } = params;
  const URL = `${DEVELOPMENT_CORS_CROSS}${APPLICATION_API}/api/location/search/?lattlong=${latitude},${longitude}`;
  const requestParams = requestGetParams();
  return request(URL, requestParams);
};

const queryLocation = async (params) => {
  const { DEVELOPMENT_CORS_CROSS, APPLICATION_API } = getDynamicConfig();
  const URL = `${DEVELOPMENT_CORS_CROSS}${APPLICATION_API}/api/location/search/?query=${params}`;
  const requestParams = requestGetParams();
  return request(URL, requestParams);
};

const getWeatherData = async (params) => {
  const { DEVELOPMENT_CORS_CROSS, APPLICATION_API } = getDynamicConfig();
  const URL = `${DEVELOPMENT_CORS_CROSS}${APPLICATION_API}/api/location/${params}/`;
  const requestParams = requestGetParams();
  return request(URL, requestParams);
};

export default { getCurrentLocationWeatherData, queryLocation, getWeatherData };
