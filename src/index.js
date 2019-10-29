import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import { Provider } from 'react-redux';
import store from './store/index';

// 导入antd全局样式。
import 'antd/dist/antd.css';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文，导入语言包，在<ConfigProvider>组件中使用。
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

// 导入日期格式化模块moment。
import moment from 'moment';
// 导入日期格式化模块的语言包
import 'moment/locale/zh-cn';
// 使用语言包
moment.locale('zh-cn');

function Auth({ location }) {
    var isLogin = store.getState();
    return isLogin ? <Main /> : <Redirect to={{ pathname: "/login", state: { from: location } }} />
}

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" render={Auth} />
                    <Route path="/login"><Login /></Route>
                </Switch>
            </Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root'));