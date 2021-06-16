import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from '@redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import actions from './shared/index.js';
import 'antd/dist/antd.less';
import 'moment/locale/zh-cn';

function render (props) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  const { container } = props;
  ReactDOM.render(
    <Provider store={reduxStore}>
      <App />
    </Provider>,
    container ? container.querySelector('#root') : document.querySelector('#root')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap () {
  console.log('micro app react bootstrap');
}

export async function mount (props) {
  console.log('micro app react mount, props', props);
  render(props);
}

export async function unmount (props) {
  console.log('micro app react unmount, props', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
