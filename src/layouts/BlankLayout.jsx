import React, { useEffect } from 'react';
import { connect } from 'dva';
import _isEmpty from 'lodash/isEmpty';
import actions from '@/stores/dynamic-config/actions';

const Layout = (props) => {
  const { dynamicConfig, getConfig, children } = props;
  useEffect(() => {
    getConfig();
  }, []);

  return !_isEmpty(dynamicConfig) && children;
};

const mapStateToProps = (state) => {
  const { dynamicConfig } = state;
  return {
    dynamicConfig: dynamicConfig.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getConfig: () => dispatch(actions.getConfig()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
