import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDayOfWeek } from '@/utils/utils';
import { Modal } from 'antd';
import './styles.less';

const WeatherDetails = (props) => {
  const {
    popupVisible,
    setPopupVisible,
    weatherDetail,
    setWeatherDetail,
    getWeatherStatusImageSrc,
  } = props;

  const {
    applicable_date,
    weather_state_abbr,
    weather_state_name,
    locationTitle,

    air_pressure,
    humidity,
    max_temp,
    min_temp,
    predictability,
    the_temp,
    visibility,
    wind_direction,
    wind_direction_compass,
    wind_speed,
  } = weatherDetail;

  useEffect(() => {
    if (!popupVisible) setWeatherDetail({});
  }, [popupVisible]);

  return (
    <Modal
      visible={popupVisible}
      onCancel={() => setPopupVisible(false)}
      footer={false}
      title={
        <div className="detail-title">
          <div
            className="detail-image"
            style={{ backgroundImage: `url(${getWeatherStatusImageSrc(weather_state_abbr)})` }}
          />
          <div className="detail-text">
            <div>{getDayOfWeek(applicable_date)}</div>
            <div>{locationTitle}</div>
            <div>{weather_state_name}</div>
          </div>
        </div>
      }
    >
      <div className="detail-content">
        <div>Min Temp : {min_temp}</div>
        <div>Max Temp : {max_temp}</div>
        <div>The Temp : {the_temp}</div>

        <div>Humidity : {humidity}</div>
        <div>Predictability : {predictability}</div>
        <div>Visibility : {visibility}</div>

        <div>Air pressure : {air_pressure}</div>

        <div>Wind direction : {wind_direction}</div>
        <div>Wind direction compass : {wind_direction_compass}</div>
        <div>Wind speed : {wind_speed}</div>
      </div>
    </Modal>
  );
};

export default WeatherDetails;

WeatherDetails.propTypes = {
  popupVisible: PropTypes.bool,
  setPopupVisible: PropTypes.func,
  weatherDetail: PropTypes.shape({
    applicable_date: PropTypes.string,
    weather_state_abbr: PropTypes.string,
    weather_state_name: PropTypes.string,
    locationTitle: PropTypes.string,
    air_pressure: PropTypes.number,
    humidity: PropTypes.number,
    max_temp: PropTypes.number,
    min_temp: PropTypes.number,
    predictability: PropTypes.number,
    the_temp: PropTypes.number,
    visibility: PropTypes.number,
    wind_direction: PropTypes.number,
    wind_direction_compass: PropTypes.string,
    wind_speed: PropTypes.number,
  }),
  setWeatherDetail: PropTypes.func,
  getWeatherStatusImageSrc: PropTypes.func,
};
