import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Modal, Select, Checkbox } from 'antd';
import { Logo } from '../../asset/icon/logo';
import './index.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
export const NewPassword: React.FC = () => {
    const moment = require('moment');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const handleModalOpen = () => {
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };
    const sendDataToAPI = async (values: any) => {
        try {
            values.dateOfBirth = moment(values.datePicker).format('YYYY-MM-DD HH:mm:ss.SSSZ');

            const response = await axios.post('http://localhost:8000/api/auth/register', values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('Người dùng đã đăng ký thành công');
                form.resetFields();
                navigate('/login');
                // console.log(updatedValues);
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
    const handleRegularPackageRegister = async () => {
        try {
            await form.validateFields();
            handleModalOpen();
        } catch (errorInfo) {
            console.log('Validation failed:', errorInfo);
        }
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
                        <h1 className="form-header__large">Welcome to Movies,</h1>
                        <p className="form-header__small">Sign up to your account</p>
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
                        encType="multipart/form-data"
                    >
                        <Form.Item
                            className="register-form__item"
                            name="email"
                            label={<span style={{ color: 'white' }}>Email</span>}
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
                            label={<span style={{ color: 'white' }}>Username</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input name="username" className="register-form__item-input" />
                        </Form.Item>

                        <Form.Item
                            className="register-form__item"
                            name="password"
                            label={<span style={{ color: 'white' }}>Password</span>}
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
                            label={<span style={{ color: 'white' }}>Confirm Password</span>}
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
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

                        <Form.Item
                            style={{ marginLeft: '-180px' }}
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox name="check" className="register-form__item-checkbox">
                                I have read the <a href="/">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item className="register-form__button" {...tailFormItemLayout}>
                            <Button
                                htmlType="button"
                                style={{
                                    borderColor: 'var(--primary-color)',
                                    color: 'var(--contrast-color)',
                                    backgroundColor: 'var(--primary-color)',
                                }}
                                onClick={handleRegularPackageRegister}
                            >
                                Đăng ký
                            </Button>
                            <div className="text-center mt-4">
                                You have an account ? {}{' '}
                                <Link className="form-signup" to="/login">
                                    Sign In
                                </Link>
                            </div>
                        </Form.Item>

                        <Modal
                            style={{ top: '12%' }}
                            title="Trải nghiệm Tuyệt vời với Gói VIP!"
                            visible={showModal}
                            onOk={handleModalClose}
                            onCancel={handleModalClose}
                            width={800}
                            footer={[
                                <Button
                                    type="primary"
                                    style={{ marginRight: '10px' }}
                                    htmlType="submit"
                                    onClick={() => {
                                        handleModalOpen();
                                        form.validateFields()
                                            .then((values) => {
                                                sendDataToAPI(values);
                                                handleModalClose();
                                            })
                                            .catch((errorInfo) => {
                                                console.log('Validation failed:', errorInfo);
                                            });
                                    }}
                                    key="cancel"
                                >
                                    Đăng ký với gói thường
                                </Button>,
                                <Link to="/VIPpackage" key="ok">
                                    <Button
                                        style={{
                                            color: 'var(--contrast-color)',
                                        }}
                                        type="primary"
                                    >
                                        Đăng ký với gói VIP
                                    </Button>
                                </Link>,
                            ]}
                        >
                            <p className="mt-4" style={{ color: 'var(--sub-color)' }}>
                                "Yêu điện ảnh và muốn thưởng thức nhiều bộ phim hơn mỗi ngày? Gói
                                VIP mang đến trải nghiệm tuyệt vời với hàng ngàn bộ phim đa dạng.
                                Bạn sẽ được truy cập sớm vào bộ phim mới nhất và không bị gián đoạn
                                bởi quảng cáo. Hãy trải nghiệm niềm đam mê điện ảnh một cách trọn
                                vẹn với Gói VIP. Mua ngay và trải nghiệm sự khác biệt!"
                            </p>
                            <img
                                alt=""
                                style={{ marginTop: '20px' }}
                                src="https://scontent.fdad3-1.fna.fbcdn.net/v/t1.15752-9/387518330_1316649055890049_4969429051850658745_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=3AaFCmb-HL0AX9SS7yH&_nc_ht=scontent.fdad3-1.fna&_nc_e2o=s&oh=03_AdTWCInJzTt8Lux8h3GOBsS8dic_h4u43l1LyWz66jh6NQ&oe=6552132E"
                            />
                            <p style={{ color: 'var(--sub-color)' }}>
                                Việc bạn có thể xem ở chế độ HD (720p), Full HD (1080p), Ultra HD
                                (4K) và HDR hay không phụ thuộc vào dịch vụ internet và khả năng của
                                thiết bị. Không phải tất cả nội dung đều có sẵn ở mọi độ phân giải.
                                Xem Điều khoản sử dụng của chúng tôi để biết thêm chi tiết.
                            </p>
                        </Modal>
                    </Form>
                </div>
            </div>
        </div>
    );
};
