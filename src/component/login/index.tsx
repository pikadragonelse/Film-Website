import { Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import './index.scss';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

export const Login: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <div className="form-list">
                <div className="header-logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="form-img">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/a36e826e-5a25-480d-ab1c-4eebd385b7cc/VN-vi-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                        alt=""
                    />
                </div>
                <div className="form-info">
                    <div className="form-header">
                        <h1 className="form-header__large"> Welcome Back, </h1>
                        <p className="form-header__small">
                            Sign in to your account
                        </p>
                    </div>
                    <Form
                        className="form-group"
                        name="basic"
                        labelCol={{ span: 8, color: 'white' }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="form-item">
                            <Form.Item<FieldType>
                                label={
                                    <span style={{ color: 'white' }}>
                                        Email
                                    </span>
                                }
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-input"
                                    style={{
                                        width: '340px',
                                        height: '40px',
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label={
                                <span style={{ color: 'white' }}>Password</span>
                            }
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                className="form-input"
                                style={{
                                    width: '340px',
                                    height: '40px',
                                }}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 14, span: 16 }}
                            style={{ marginBottom: '60px' }}
                        >
                            <Checkbox style={{ color: 'white' }}>
                                Remember me
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <button className="form-button focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm py-2.5 mr-10 mb-2">
                                <Link to="/">
                                    <span>Đăng nhập</span>
                                </Link>
                            </button>
                        </Form.Item>
                        <div className="form-change">
                            Don't have an account ? {}{' '}
                            <Link className="form-signup" to="/register">
                                Sign Up
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
