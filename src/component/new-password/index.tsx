import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Modal, Select, Checkbox } from 'antd';
import { Logo } from '../../asset/icon/logo';
import './index.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 26 },
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

export const NewPassword: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const sendDataToAPI = async (values: any) => {
        try {
            const response = await axios.post('', values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                alert('Đổi mật khẩu hành công');
                form.resetFields();
                navigate('/login');
            } else {
                console.error('Error registering user:', response.data);
            }
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        sendDataToAPI(values);
    };
    const handleNewPassword = async () => {
        try {
            await form.validateFields();
        } catch (errorInfo) {
            console.log('Validation failed:', errorInfo);
        }
    };
    return (
        <div className="newpassword">
            <div className="form-list">
                <Link to="" className="header-logo">
                    <Logo />
                </Link>
                <div className="form-img">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/a36e826e-5a25-480d-ab1c-4eebd385b7cc/VN-vi-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                        alt=""
                    />
                </div>

                <div className="newpassword-form">
                    <div className="newpassword-form__header">
                        <h1 className="form-header__large">Chào mừng trở lại,</h1>
                        <p className="form-header__small">
                            đổi mật khẩu mới để sử dụng tài khoản của bạn.
                        </p>
                    </div>
                    <Form
                        className="newpassword-form__group"
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        name="newpassword"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                        encType="multipart/form-data"
                    >
                        <Form.Item
                            className="newpassword-form__item"
                            name="password"
                            label={<span style={{ color: 'white' }}>Mật khẩu mới</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password className="newpassword-form__item-input" />
                        </Form.Item>
                        <Form.Item
                            className="newpassword-form__item"
                            name="confirm"
                            label={<span style={{ color: 'white' }}>Xác nhận lại mật khẩu</span>}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu của bạn!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('Mật khẩu không trùng khớp!'),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="newpassword-form__item-input" />
                        </Form.Item>
                        <Form.Item className="newpassword-form__button" {...tailFormItemLayout}>
                            <Button
                                htmlType="button"
                                style={{
                                    borderColor: 'var(--primary-color)',
                                    color: 'var(--contrast-color)',
                                    backgroundColor: 'var(--primary-color)',
                                }}
                                onClick={handleNewPassword}
                            >
                                Xác nhận
                            </Button>
                            <div className="text-center mt-16">
                                Bạn mới sử dụng MovTime ? {}{' '}
                                <Link className="form-signup" to="/register">
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
