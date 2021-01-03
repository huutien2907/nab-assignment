import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { dummyWeatherData, dummyLocationTitle, dummyImageUrl } from './dummyData';
import { getDayOfWeek } from '@/utils/utils';

import WeatherSummary from '../WeatherSummary';

configure({ adapter: new Adapter() });

const getWeatherStatusImageSrc = () => {
  return dummyImageUrl;
};

let component;

beforeEach(() => {
  component = mount(
    <WeatherSummary
      weatherData={dummyWeatherData}
      locationTitle={dummyLocationTitle}
      getWeatherStatusImageSrc={getWeatherStatusImageSrc}
    />,
  );
});

describe('testing Weather Summary UI', () => {
  it('should render Weather Summary component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct weather Status', () => {
    const coverImage = component.find('.coverImage');
    expect(coverImage).toBeTruthy();
    expect(coverImage.prop('style')['backgroundImage']).toBe(`url(${dummyImageUrl})`);
  });

  it('should display correct given data', () => {
    expect(component.find('.date-of-week').text()).toBe(
      getDayOfWeek(dummyWeatherData.applicable_date),
    );
    expect(component.find('.location-title').text()).toBe(dummyLocationTitle);
    expect(component.find('.weather-state-name').text()).toBe(dummyWeatherData.weather_state_name);
    expect(component.find('.min-temp').text()).toBe(`${dummyWeatherData.min_temp.toFixed(2)}°`);
    expect(component.find('.max-temp').text()).toBe(`${dummyWeatherData.max_temp.toFixed(2)}°`);
  });
});
