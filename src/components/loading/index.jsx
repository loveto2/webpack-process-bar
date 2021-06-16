import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const Loading = () => (
  <div className={styles.loading}>
    <Spin size="large" tip="加载中..." />
  </div>
);

export default Loading;
