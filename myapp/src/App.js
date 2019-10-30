import { Layout, Menu, Icon, Button } from 'antd';
import React, { useReducer } from 'react';
import './App.css';
import logo from './asserts/logo.svg';
import logoTitle from './asserts/logo-title.svg';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Books from './components/Books';
import Borrow from './components/Borrow';
import BackBook from './components/BackBook';

const { Header, Sider, Content } = Layout;

class App extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userInfo");
        this.props.history.push("/login");
    }

    render() {
        let { url, path } = this.props.match;
        let user = JSON.parse(localStorage.getItem("userInfo"));
        console.log(user)
        return (
            <Layout className="App">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
                    <div className="logo">
                        <img src={logo} alt="LOGO" />
                        <img src={logoTitle} alt="LOGOTITLE" />
                    </div>
                    <Menu theme="light" mode="inline">
                        <Menu.Item key="key1">
                            <Link to={`${url}/users`}>
                                <Icon type="user" />
                                <span>用户管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            key="key2"
                            title={
                                <span>
                                    <Icon type="book" />
                                    <span>图书管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="key21">
                                <Link to={`${url}/books`}>
                                    <span>
                                        <Icon type="database" />图书管理
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="key22">
                                <Link to={`${url}/borrow`}>
                                    <span>
                                        <Icon type="shopping" />图书借阅
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="key23">
                                <Link to={`${url}/backbook`}>
                                    <span>
                                        <Icon type="interaction" />图书归还
                                    </span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} className="clearfix">
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <span>欢迎<span style={{ color: "red",margin: '0 10px'  }}>{user.nickname}</span>登录</span>
                        <Button type="danger" size="large" className="Right" onClick={this.logout}>
                            <Icon type="logout"></Icon>注销
                        </Button>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff'
                        }}
                    >
                        <Switch>
                            <Route exact path={path}>
                                <h3>这个实例主要练习antd在react框架中的使用</h3>
                            </Route>
                            <Route path={`${path}/users`}>
                                <Users></Users>
                            </Route>
                            <Route path={`${path}/books`}>
                                <Books></Books>
                            </Route>
                            <Route path={`${path}/borrow`}>
                                <Borrow></Borrow>
                            </Route>
                            <Route path={`${path}/backbook`}>
                                <BackBook></BackBook>
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(connect()(App));
