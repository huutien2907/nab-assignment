import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { getDayOfWeek } from '@/utils/utils';
import './styles.less';

const WeatherSummary = (props) => {
  const { weatherData, locationTitle, getWeatherStatusImageSrc, showWeatherDetail } = props;
  const {
    applicable_date,
    min_temp,
    max_temp,
    weather_state_abbr,
    weather_state_name,
  } = weatherData;

  return (
    <Card
      hoverable
      bordered
      onClick={() => showWeatherDetail({ ...weatherData, locationTitle })}
      title={
        <>
          <div className="date-of-week">{getDayOfWeek(applicable_date)}</div>
          <div className="location-title">{locationTitle}</div>
        </>
      }
    >
      <div className="content">
        <div className="weather-state-image">
          <div
            className="coverImage"
            style={{ backgroundImage: `url(${getWeatherStatusImageSrc(weather_state_abbr)})` }}
          />
        </div>
        <div className="temparatures">
          <div className="weather-state-name">{weather_state_name}</div>
          <div className="min-temp">
            <span>{min_temp.toFixed(2)}°</span>
          </div>
          <div className="max-temp">
            <span>{max_temp.toFixed(2)}°</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherSummary;

WeatherSummary.propTypes = {
  weatherData: PropTypes.shape({
    applicable_date: PropTypes.string,
    min_temp: PropTypes.number,
    max_temp: PropTypes.number,
    weather_state_abbr: PropTypes.string,
    weather_state_name: PropTypes.string,
  }),
  locationTitle: PropTypes.string,
  getWeatherStatusImageSrc: PropTypes.func,
  showWeatherDetail: PropTypes.func,
};
