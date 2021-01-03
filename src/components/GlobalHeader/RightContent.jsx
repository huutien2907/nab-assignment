import { Tooltip, Tag, Input } from 'antd';
import { QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import searchbarActions from '@/stores/search-bar/actions';

const { Search } = Input;

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout, setFilter, filter } = props;
  let className = styles.right;

  const [tempFilter, setTempFilter] = useState('');

  useEffect(() => {
    setTempFilter(filter);
  }, [filter]);

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={styles['header-content']}>
      <Input
        value={tempFilter}
        prefix={<SearchOutlined />}
        allowClear
        onChange={({ target }) => {
          setTempFilter(target.value);
        }}
        onPressEnter={({ target }) => {
          setFilter(target.value);
        }}
      />
      {/* <NoticeIconView /> */}
    </div>
  );

  // return (
  //   <div className={className}>
  //     <HeaderSearch
  //       className={`${styles.action} ${styles.search}`}
  //       placeholder="站内搜索"
  //       defaultValue="umi ui"
  //       options={[
  //         {
  //           label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
  //           value: 'umi ui',
  //         },
  //         {
  //           label: <a href="next.ant.design">Ant Design</a>,
  //           value: 'Ant Design',
  //         },
  //         {
  //           label: <a href="https://protable.ant.design/">Pro Table</a>,
  //           value: 'Pro Table',
  //         },
  //         {
  //           label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
  //           value: 'Pro Layout',
  //         },
  //       ]} // onSearch={value => {
  //       //   //console.log('input', value);
  //       // }}
  //     />
  //     <Tooltip title="使用文档">
  //       <a
  //         style={{
  //           color: 'inherit',
  //         }}
  //         target="_blank"
  //         href="https://pro.ant.design/docs/getting-started"
  //         rel="noopener noreferrer"
  //         className={styles.action}
  //       >
  //         <QuestionCircleOutlined />
  //       </a>
  //     </Tooltip>
  //     <NoticeIconView />
  //   <Avatar menu />
  //   {REACT_APP_ENV && (
  //     <span>
  //       <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
  //     </span>
  //   )}
  //   {/* <SelectLang className={styles.action} /> */}
  // </div>
  // );
};

const mapDispatchToProps = (dispatch) => ({
  setFilter: (payload) => dispatch(searchbarActions.setFilter(payload)),
});

export default connect(
  ({ settings, searchBar }) => ({
    theme: settings.navTheme,
    layout: settings.layout,
    filter: searchBar?.filter || '',
  }),
  mapDispatchToProps,
)(GlobalHeaderRight);
