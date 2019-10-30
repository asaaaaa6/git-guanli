import { Layout, Menu, Icon, Button } from 'antd';
import React from 'react';
import './Main.css';
import logo from '../asserts/logo.svg';
import logoTitle from '../asserts/logo-title.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

class Main extends React.Component {
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
        this.props.history.push("/login");
    }

    render() {
        return (
            <Layout className="Main">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} theme="light">
                    <div className="logo">
                        <img src={logo} alt="LOGO" />
                        <img src={logoTitle} alt="LOGOTITLE" />
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['key1']}>
                        <Menu.Item key="key1">
                            <Icon type="user" />
                            <span>用户管理</span>
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
                                <Icon type="database" />图书管理
                            </Menu.Item>
                            <Menu.Item key="key22">
                                <Icon type="shopping" />图书借阅
                            </Menu.Item>
                            <Menu.Item key="key23">
                                <Icon type="interaction" />图书归还
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

                        <Button type="danger" size="large" className="Right" onClick={this.logout}>
                            <Icon type="logout"></Icon>注销
                        </Button>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(connect()(Main));
