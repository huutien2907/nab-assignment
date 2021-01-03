/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { NOTIFICATION_DURATION } from '@/utils/appConfig';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'Internal Server Error',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    notification.error({
      description: errorText,
      duration: NOTIFICATION_DURATION.MEDIUM,
    });
  } else if (!response) {
    notification.error({
      description: 'Internal Server Error',
      duration: NOTIFICATION_DURATION.MEDIUM,
    });
  }

  // return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
});

request.interceptors.request.use((url, options) => {
  const cOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Access-Controll-Allow-Origin': '*',
    },
  };
  return { url, options: cOptions };
});

export default request;
