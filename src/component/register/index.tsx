import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import './index.scss';

const { Option } = Select;

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
const config = {
    rules: [
        {
            type: 'object' as const,
            required: true,
            message: 'Please select time!',
        },
    ],
};

export const Register: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="register">
            <div className="form-list">
                <div className="header-logo">
                    <Logo />
                </div>
                <div className="form-img">
                    <img
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/a36e826e-5a25-480d-ab1c-4eebd385b7cc/VN-vi-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                        alt=""
                    />
                </div>
                <div className="register-form">
                    <div className="register-form__header">
                        <h1 className="form-header__large">
                            Welcome to Movies,
                        </h1>
                        <p className="form-header__small">
                            Sign up to your account
                        </p>
                    </div>
                    <Form
                        className="register-form__group"
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        name="register"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            className="register-form__item"
                            name="email"
                            label={
                                <span style={{ color: 'white' }}>Email</span>
                            }
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input className="register-form__item-input" />
                        </Form.Item>

                        <Form.Item
                            className="register-form__item"
                            name="username"
                            label={
                                <span style={{ color: 'white' }}>Username</span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input className="register-form__item-input" />
                        </Form.Item>

                        <Form.Item
                            className="register-form__item"
                            name="password"
                            label={
                                <span style={{ color: 'white' }}>Password</span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password className="register-form__item-input" />
                        </Form.Item>
                        <Form.Item
                            className="register-form__item"
                            name="confirm"
                            label={
                                <span style={{ color: 'white' }}>
                                    Confirm Password
                                </span>
                            }
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'The new password that you entered do not match!',
                                            ),
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="register-form__item-input" />
                        </Form.Item>
                        <div className="register-form__confirm">
                            <Form.Item
                                style={{ marginRight: '20px' }}
                                className="register-form__item"
                                name="date-picker"
                                label={
                                    <span style={{ color: 'white' }}>
                                        Date of birth
                                    </span>
                                }
                                {...config}
                            >
                                <DatePicker className="register-form__item-input" />
                            </Form.Item>

                            <Form.Item
                                className="register-form__item"
                                name="gender"
                                label={
                                    <span style={{ color: 'white' }}>
                                        Gender
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select gender!',
                                    },
                                ]}
                            >
                                <Select
                                    className="register-form__item-input"
                                    placeholder="select"
                                    style={{
                                        width: '180px',
                                    }}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            style={{ marginLeft: '-180px' }}
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  new Error(
                                                      'Should accept agreement',
                                                  ),
                                              ),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox className="register-form__item-checkbox">
                                I have read the <a href="/">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item
                            className="register-form__button"
                            {...tailFormItemLayout}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={handleModalOpen}
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>

                        <Modal
                            style={{ top: '20%' }}
                            title="Trải nghiệm Tuyệt vời với Gói VIP!"
                            visible={showModal}
                            onOk={handleModalClose}
                            onCancel={handleModalClose}
                            width={800}
                            footer={[
                                <Button
                                    style={{ marginRight: '8px' }}
                                    key="cancel"
                                    onClick={handleModalClose}
                                >
                                    Đăng ký với gói thường
                                </Button>,
                                <Link to="/payment" key="ok">
                                    <Button
                                        type="primary"
                                        onClick={handleModalClose}
                                    >
                                        Đăng ký với gói VIP
                                    </Button>
                                </Link>,
                            ]}
                        >
                            <p>
                                "Yêu điện ảnh và muốn thưởng thức nhiều bộ phim
                                hơn mỗi ngày? Gói VIP mang đến trải nghiệm tuyệt
                                vời với hàng ngàn bộ phim đa dạng. Bạn sẽ được
                                truy cập sớm vào bộ phim mới nhất và không bị
                                gián đoạn bởi quảng cáo. Hãy trải nghiệm niềm
                                đam mê điện ảnh một cách trọn vẹn với Gói VIP.
                                Mua ngay và trải nghiệm sự khác biệt!"
                            </p>
                            <img
                                alt=""
                                style={{ marginTop: '15px' }}
                                src="https://scontent.fdad3-4.fna.fbcdn.net/v/t1.15752-9/382892576_308999305108531_18785520390768619_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=x-SMOf89ITMAX9tOOiB&_nc_ht=scontent.fdad3-4.fna&oh=03_AdSc29mSdVcRTN1ygnmre0QV_uMdvdm-wTW3tEgZqaY-lg&oe=653F3A39"
                            />
                            <p className="animated-text">
                                Nhấn vào nút OK để tiếp tục quá trình đăng ký
                                với gói VIP
                            </p>
                        </Modal>
                    </Form>
                </div>
            </div>
        </div>
    );
};
