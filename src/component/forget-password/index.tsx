import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import './index.scss';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export const LoginForget: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (data: FieldType) => {
        setLoading(true);
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
                <div className="form-info-forgot">
                    <div className="form-header">
                        <h1 className="form-header__large"> Chào mừng bạn, </h1>
                        <p className="form-header__small">nhập email để lấy lại tài khoản.</p>
                    </div>
                    <Form
                        className="form-group mt-20"
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
                                name="username"
                                className="mb-12"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Nhập email xác nhận"
                                    className="form-input"
                                    style={{
                                        width: '330px',
                                        height: '42px',
                                    }}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                className="form-btn-login"
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>
                        <div className="form-change">
                            Bạn mới sử dụng MovTime ? {}{' '}
                            <Link className="form-signup" to="/register">
                                Đăng ký ngay
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
