import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import './Login.css';
import {
    Form,
    Input,
    Icon,
    Button,
    message
} from 'antd';
import axios from 'axios';

class Login extends React.Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios.get("mock/users.json").then((res) => {
                    var users = res.data.users;
                    var user = users.filter((u) => {
                        return u.email === values.email && u.password === values.password;
                    })[0];
                    if (user) {
                        localStorage.setItem("isAuthenticated", "yes");
                        localStorage.setItem("userInfo", JSON.stringify(user));
                        this.props.dispatch({ type: "LOGIN" });
                        this.props.history.push("/main");
                    } else {
                        message.error('邮箱或密码有误！');
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="LoginForm">
                <h2>登录</h2>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '邮箱格式错误!',
                            },
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '输入密码!',
                            }
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">
                        <Icon type="login"></Icon>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({ name: 'login' })(Login);

export default withRouter(connect()(WrappedLoginForm));

