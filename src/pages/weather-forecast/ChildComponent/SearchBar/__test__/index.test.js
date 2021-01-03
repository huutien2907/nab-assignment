import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchBar from '../SearchBar';
import { dummyQueryLocation } from './dummyData';
import { act } from 'react-dom/test-utils';
import { DEBOUNCE_TIME } from '@/utils/appConfig';

configure({ adapter: new Adapter() });

let component;

const getQueryLocation = jest.fn();

const getWeatherData = jest.fn();

const setSearchLoading = jest.fn();

const searchLoading = true;

const setContentLoading = jest.fn();

const contentLoading = true;

beforeEach(() => {
  component = mount(
    <SearchBar
      getQueryLocation={getQueryLocation}
      dummyQueryLocation={dummyQueryLocation}
      getWeatherData={getWeatherData}
      setSearchLoading={setSearchLoading}
      searchLoading={searchLoading}
      setContentLoading={setContentLoading}
      contentLoading={contentLoading}
    />,
  );
});

describe('testing Search Bar UI', () => {
  it('should render Search Bar', () => {
    expect(component).toBeTruthy();
  });

  it('should change search fields and excute search function', () => {
    act(() => {
      component.find('input').simulate('change', { target: { value: 'spam' } });
    });
    component.update();
    setTimeout(() => {
      expect(component.find('input').prop('value')).toBe('spam');
      expect(getQueryLocation).toBeCalledTimes(1);
    }, DEBOUNCE_TIME);
  });
});
