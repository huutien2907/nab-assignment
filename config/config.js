// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './router.config';
const { REACT_APP_ENV } = process.env;

const { BASE_PATH } = process.env;

const global_enviroment = {
  BASE_PATH: BASE_PATH === undefined || BASE_PATH === '' ? '/' : BASE_PATH,
};

export default defineConfig({
  define: global_enviroment,
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
    baseSeparator: '-',
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  publicPath: global_enviroment.BASE_PATH,
  runtimePublicPath: true,
  base: global_enviroment.BASE_PATH,
  manifest: {
    basePath: global_enviroment.BASE_PATH,
  },
  exportStatic: {},
  esbuild: {},
});
