import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { weatherDetail, dummyImageUrl } from './dummyData';
import { getDayOfWeek } from '@/utils/utils';

import WeatherDetails from '../WeatherDetails';

configure({ adapter: new Adapter() });

const setPopupVisible = jest.fn();
const setWeatherDetail = jest.fn();
const getWeatherStatusImageSrc = () => {
  return dummyImageUrl;
};

let component;

beforeEach(() => {
  component = mount(
    <WeatherDetails
      popupVisible
      weatherDetail={weatherDetail}
      setPopupVisible={setPopupVisible}
      setWeatherDetail={setWeatherDetail}
      getWeatherStatusImageSrc={getWeatherStatusImageSrc}
    />,
  );
});

describe('testing Weather Detail UI', () => {
  it('should render Weather Detail component', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct modal title', () => {
    const modalTitle = component.find('.ant-modal-title');
    expect(modalTitle).toBeTruthy();

    const coverImage = modalTitle.find('.detail-image');
    expect(coverImage.prop('style')['backgroundImage']).toBe(`url(${dummyImageUrl})`);

    const textTitle = modalTitle.find('.detail-text');
    expect(textTitle.children().at(0).text()).toBe(getDayOfWeek(weatherDetail.applicable_date));
    expect(textTitle.children().at(1).text()).toBe(weatherDetail.locationTitle);
    expect(textTitle.children().at(2).text()).toBe(weatherDetail.weather_state_name);
  });

  it('should display correct given data', () => {
    const detailContent = component.find('.detail-content');
    expect(detailContent).toBeTruthy();

    expect(detailContent.children().at(0).text()).toBe(`Min Temp : ${weatherDetail.min_temp}`);
    expect(detailContent.children().at(1).text()).toBe(`Max Temp : ${weatherDetail.max_temp}`);
    expect(detailContent.children().at(2).text()).toBe(`The Temp : ${weatherDetail.the_temp}`);
    expect(detailContent.children().at(3).text()).toBe(`Humidity : ${weatherDetail.humidity}`);
    expect(detailContent.children().at(4).text()).toBe(
      `Predictability : ${weatherDetail.predictability}`,
    );
    expect(detailContent.children().at(5).text()).toBe(`Visibility : ${weatherDetail.visibility}`);
    expect(detailContent.children().at(6).text()).toBe(
      `Air pressure : ${weatherDetail.air_pressure}`,
    );
    expect(detailContent.children().at(7).text()).toBe(
      `Wind direction : ${weatherDetail.wind_direction}`,
    );
    expect(detailContent.children().at(8).text()).toBe(
      `Wind direction compass : ${weatherDetail.wind_direction_compass}`,
    );
    expect(detailContent.children().at(9).text()).toBe(`Wind speed : ${weatherDetail.wind_speed}`);
  });
});
