import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import zhCN from 'antd/es/locale-provider/zh_CN';
import '@config/antd-fixed';
import Loading from '@components/loading';
import './App.css';
import Routes from './router';
import actions from '@shared';

function App () {
  const dispatch = useDispatch();
  useEffect(() => {
    actions.onGlobalStateChange(state => {
      console.log(7777, state);
      dispatch({ type: 'user/login', payload: state });
    }, true);
  });
  return (
    <ConfigProvider locale={zhCN} prefixCls="cmp">
      <BrowserRouter className="App" basename="/micro/demo">
        <Switch>
          <Suspense fallback={<Loading />}>
            {Routes.map((item) => (
              <Route key={item.key} path={item.path} exact component={lazy(item.loader)} />
            ))}
          </Suspense>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
