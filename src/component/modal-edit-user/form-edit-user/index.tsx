import { Button, DatePicker, Form, FormInstance, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadAvtCircle } from '../../upload-avt-circle';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useForm } from 'antd/es/form/Form';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export type FormEditUser = {
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    onSubmit?: React.MouseEventHandler<HTMLElement> | undefined;
    open?: boolean;
};
export const FormEditUser = ({ onCancel, onSubmit, open }: FormEditUser) => {
    const [previewImage, setPreviewImage] = useState<string>('');
    const [form] = useForm();

    useEffect(() => {
        form.resetFields();
    }, [open]);

    const handleChange = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
    };

    const onSubmitForm = (data: {
        avatar: string;
        username: string;
        dateOfBirth: string;
    }) => {
        // Fill API vo day
    };
    return (
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
        >
            <Form.Item name="avatar">
                <UploadAvtCircle
                    onChange={(info) => {
                        handleChange(info.file);
                    }}
                    previewImage={previewImage}
                />
            </Form.Item>
            <Form.Item
                name="name"
                label="Username"
                rules={[{ required: false }]}
            >
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="Date Of Birth"
                label="Date of birth"
                // rules={[{ required: true }]}
            >
                <DatePicker className="form-date-picker" />
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
