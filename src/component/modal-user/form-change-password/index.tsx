import React, { useEffect } from 'react';
import './index.scss';
import { Button, Form, Input, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';

export type FormChangePassword = {
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    onSubmit?: React.MouseEventHandler<HTMLElement> | undefined;
    open?: boolean;
};
export const FormChangePassword = ({
    onCancel,
    onSubmit,
    open,
}: FormChangePassword) => {
    const [form] = useForm();

    useEffect(() => {
        form.resetFields();
    }, [open]);

    return (
        <Form layout="vertical">
            <Form.Item
                name="currentPassword"
                label="Mật khẩu hiện tại"
                rules={[{ required: true, message: 'Cần nhập mật khẩu cũ' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[{ required: true, message: 'Cần nhập mật khẩu mới' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                name="confirmNewPassword"
                label="Xác nhận mật khẩu mới"
                rules={[
                    { required: true, message: 'Cần xác nhận mật khẩu mới' },
                ]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item className="btn-form-container">
                <Space>
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={() => {
                            console.log(form.getFieldsValue());
                            // onSubmitForm()
                        }}
                        htmlType="submit"
                    >
                        Edit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
