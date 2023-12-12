import { Button, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import { setIslogin, setUsername } from '../../redux/isLoginSlice';
import './index.scss';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onFinish = (data: FieldType) => {
        setLoading(true);

        axios
            .post('http://localhost:8000/api/auth/login', data)
            .then((response) => {
                console.log('POST', response);
                let accessToken = JSON.stringify(response.data.result.token.accessToken);
                let refreshToken = JSON.stringify(response.data.result.token.refreshToken);
                setLoading(false);

                if (response.status === 200) {
                    notification.success({
                        message: 'Đăng nhập thành công',
                        description: 'Chúc mừng, bạn đã đăng nhập thành công',
                    });

                    dispatch(setIslogin(true));

                    if (data.username) {
                        dispatch(setUsername(data.username));
                        Cookies.set('username', data.username, { expires: 1, secure: true });
                    }
                    Cookies.set('accessToken', accessToken, { expires: 1 });
                    Cookies.set('refreshToken', refreshToken, { expires: 1 });
                    navigate('/');
                } else {
                    if (response.data.error) {
                        notification.error({
                            message: 'Đăng nhập không thành công',
                            description: 'Sai mật khẩu hoặc tài khoản. Vui lòng thử lại.',
                        });
                    }
                }
            })
            .catch(function (err) {
                setLoading(false);
                console.error(err);
                notification.error({
                    message: 'Đăng nhập không thành công',
                    description: 'Sai mật khẩu hoặc tài khoản. Vui lòng thử lại.',
                });
            });
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
                        <p className="form-header__small">Sign in to your account</p>
                    </div>
                    <Form
                        className="form-group"
                        name="basic"
                        labelCol={{ span: 8, color: 'white' }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="form-item">
                            <Form.Item<FieldType>
                                label={<span style={{ color: 'white' }}>Username</span>}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-input"
                                    style={{
                                        width: '330px',
                                        height: '42px',
                                    }}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item<FieldType>
                            label={<span style={{ color: 'white' }}>Password</span>}
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
                                    width: '330px',
                                    height: '42px',
                                }}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 14, span: 16 }}
                            style={{ marginBottom: '60px' }}
                        >
                            <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="form-btn-login"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Đăng nhập
                            </Button>
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
