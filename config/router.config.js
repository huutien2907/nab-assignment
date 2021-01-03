export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        redirect: '/weather-forecast',
      },
      {
        path: '/weather-forecast',
        component: './weather-forecast',
      },
      {
        component: '404',
      },
    ],
  },
];
