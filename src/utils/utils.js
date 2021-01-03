import { parse } from 'querystring';
import _pick from 'lodash/pick';
import { getDvaApp } from 'umi';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { APP_FORMAT } from '@/utils/appConfig';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const requestPostParams = (params) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params || {}),
  };
};

export const requestGetParams = () => {
  return {
    method: 'GET',
    headers: {
      'Content-type': 'application/json-path+json',
    },
  };
};

export const getParamsString = (requestPayload) => {
  const filterParamKeys = Object.keys(requestPayload).filter((k) => requestPayload[k]);
  const paramsString = filterParamKeys.reduce(
    (str, key, index) =>
      (str += `${key}=${requestPayload[key]}${index < filterParamKeys.length - 1 ? '&' : ''}`),
    '',
  );
  return paramsString;
};

export const checkIsGetNextPage = (ele, { currentRecords, total, loading }) => {
  if (ele) {
    const { scrollTop = 0, offsetHeight = 0, scrollHeight = 0 } = ele;
    return currentRecords < total && scrollTop + offsetHeight === scrollHeight && !loading;
  }
  return false;
};

export const getDynamicConfig = () => {
  const { data } = getDvaApp()._store.getState()['dynamicConfig'];
  if (!_isEmpty(data)) {
    return _pick(data, ['APPLICATION_API', 'DEVELOPMENT_CORS_CROSS']);
  }
  return {};
};

export const getDayOfWeek = (date) => {
  const momentObject = moment(date);
  return `${momentObject.format(APP_FORMAT.DAY_OF_WEEK)} ( ${momentObject.format(
    APP_FORMAT.DATE,
  )} )`;
};
