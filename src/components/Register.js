import React from 'react';
import './Register.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Checkbox,
    Button,
} from 'antd';

class Register extends React.Component {
    state = {
        confirmDirty: false
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Select.Option value="86">+86</Select.Option>
            </Select>,
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="RegisterForm">
                <h2>注册</h2>
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
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '输入确认密码!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            昵称&nbsp;
                            <Tooltip title="给自己起个好记且好听的名字好吗?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '输入昵称!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="手机">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '输入手机!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>
                            是否同意 <a href="https://www.baidu.com">协议</a>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">
                        <Icon type="user-add"></Icon>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm;