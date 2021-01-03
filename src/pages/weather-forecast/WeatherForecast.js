import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import actions from '@/stores/weather-forecast/actions';
import _isEmpty from 'lodash/isEmpty';
import { Empty, Spin } from 'antd';
import WeatherSummary from './ChildComponent/WeatherSummary';
import SearchBar from './ChildComponent/SearchBar';
import WeatherDetails from './ChildComponent/WeatherDetails';
import './styles.less';

const WeatherForecast = (props) => {
  const {
    currentLocationWeatherData,
    getQueryLocation,
    getWeatherData,
    reduxState,
    dynamicConfig,
    clearReduxData,
  } = props;

  const { queryLocation, weatherData } = reduxState;
  const [searchLoading, setSearchLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [weatherDetail, setWeatherDetail] = useState({});

  useEffect(() => {
    getDefaultWeatherData();
    return () => {
      clearReduxData();
    };
  }, []);

  const getDefaultWeatherData = () => {
    const success = async (position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;
      await currentLocationWeatherData({ latitude, longitude });
      setContentLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, () => {
      setContentLoading(false);
    });
  };

  const getWeatherStatusImageSrc = (weather_state_abbr) => {
    const { APPLICATION_API } = dynamicConfig;
    return `${APPLICATION_API}/static/img/weather/${weather_state_abbr}.svg`;
  };

  const showWeatherDetail = (detail) => {
    setPopupVisible(true);
    const convertDetail = { ...detail };
    Object.keys(detail).forEach((key) => {
      if (typeof detail[key] === 'number') {
        convertDetail[key] = parseFloat(detail[key].toFixed(2));
      }
    });
    setWeatherDetail(convertDetail);
  };

  const renderWeatherSummary = () => {
    if (_isEmpty(weatherData?.consolidated_weather) && !contentLoading) {
      return <Empty />;
    }
    if (contentLoading) {
      return <Spin spinning size="large" />;
    }
    return (weatherData?.consolidated_weather || []).map((data) => (
      <WeatherSummary
        key={data.id}
        weatherData={data}
        locationTitle={weatherData.title}
        getWeatherStatusImageSrc={getWeatherStatusImageSrc}
        showWeatherDetail={showWeatherDetail}
      />
    ));
  };

  return (
    <>
      <div className="container">
        <div className="search-bar">
          <SearchBar
            getQueryLocation={getQueryLocation}
            queryLocation={queryLocation}
            getWeatherData={getWeatherData}
            setSearchLoading={setSearchLoading}
            searchLoading={searchLoading}
            setContentLoading={setContentLoading}
            contentLoading={contentLoading}
          />
        </div>
        <div
          className="weather-summary"
          style={{
            justifyContent:
              contentLoading || _isEmpty(weatherData?.consolidated_weather) ? 'center' : 'unset',
          }}
        >
          {renderWeatherSummary()}
        </div>
      </div>
      <WeatherDetails
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        weatherDetail={weatherDetail}
        setWeatherDetail={setWeatherDetail}
        getWeatherStatusImageSrc={getWeatherStatusImageSrc}
      />
    </>
  );
};

const mapStateToProps = ({ WeatherForecast, dynamicConfig }) => ({
  reduxState: WeatherForecast.toJS(),
  dynamicConfig: dynamicConfig.data,
});

const mapDispatchToProps = (dispatch) => ({
  currentLocationWeatherData: (payload) => dispatch(actions.currentLocationWeatherData(payload)),
  getQueryLocation: (payload) => dispatch(actions.getQueryLocation(payload)),
  getWeatherData: (payload) => dispatch(actions.getWeatherData(payload)),
  clearReduxData: () => dispatch(actions.clearReduxData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);
