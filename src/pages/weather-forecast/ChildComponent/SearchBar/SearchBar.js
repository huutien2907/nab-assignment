import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import { DEBOUNCE_TIME } from '@/utils/appConfig';
import './styles.less';

const SearchBar = (props) => {
  const {
    getQueryLocation,
    queryLocation,
    getWeatherData,
    setSearchLoading,
    searchLoading,
    setContentLoading,
    contentLoading,
  } = props;

  const handleOnSearch = async (params) => {
    if (params) {
      setSearchLoading(true);
      await getQueryLocation(params);
      setSearchLoading(false);
    }
  };

  const handleOnChange = async (params) => {
    if (params) {
      setContentLoading(true);
      await getWeatherData(params);
      setContentLoading(false);
    }
  };

  return (
    <div className="content">
      <Select
        className="select-box"
        showSearch
        loading={searchLoading}
        disabled={contentLoading}
        placeholder="Search Location"
        filterOption={false}
        onSearch={_debounce(handleOnSearch, DEBOUNCE_TIME)}
        onChange={handleOnChange}
      >
        {!_isEmpty(queryLocation) &&
          queryLocation.map((location) => (
            <Select.Option key={location.woeid}>{location.title}</Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  getQueryLocation: PropTypes.func,
  queryLocation: PropTypes.array,
  getWeatherData: PropTypes.func,
  setSearchLoading: PropTypes.func,
  searchLoading: PropTypes.bool,
  setContentLoading: PropTypes.func,
  contentLoading: PropTypes.bool,
};
