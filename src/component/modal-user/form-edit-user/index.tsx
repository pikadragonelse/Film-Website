import { Button, DatePicker, Form, FormInstance, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadAvtCircle } from '../../upload-avt-circle';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useForm } from 'antd/es/form/Form';
import { request } from '../../../utils/request';
import Cookies from 'js-cookie';
import { CurrentUser } from '../../comment';
import { log } from 'console';
import dayjs from 'dayjs';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const { Option } = Select;
export type FormEditUser = {
    onCancel?: React.MouseEventHandler<HTMLElement> | undefined;
    onSubmit?: React.MouseEventHandler<HTMLElement> | undefined;
    open?: boolean;
    data: CurrentUser;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
export const FormEditUser = ({ onCancel, onSubmit, open, data, setIsOpenEdit }: FormEditUser) => {
    const [previewImage, setPreviewImage] = useState<string>(data.avatarURL);
    const [form] = useForm();
    const handleChange = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
    };

    const onSubmitForm = (data: {
        userId: number;
        email: string;
        dateOfBirth: string;
        gender: string;
        username: string;
    }) => {
        // Fill API vo day

        const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
        data.userId = JSON.parse(atob(accessToken.split('.')[1])).userId;
        const editProfileUser = async () => {
            try {
                await request.put('user/update-user', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setIsOpenEdit(false);
            } catch (error) {
                console.error(error);
            }
        };
        editProfileUser();
    };

    return (
        <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            initialValues={{
                avatar: data.avatarURL,
                username: data.username,
                email: data.email,
                dateOfBirth: dayjs(data.dateOfBirth),
                gender: data.gender,
            }}
        >
            <Form.Item name="avatar">
                <UploadAvtCircle
                    onChange={(info) => {
                        handleChange(info.file);
                    }}
                    previewImage={previewImage}
                />
            </Form.Item>
            <Form.Item name="username" label="Tên người dùng" rules={[{ required: false }]}>
                <Input value={data.username} />
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input value={data.email} readOnly />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="Ngày sinh">
                <DatePicker className="form-date-picker" />
            </Form.Item>

            <Form.Item name="gender" label={<span style={{ color: 'white' }}>Gender</span>}>
                <Select
                    value={data.gender}
                    style={{
                        width: '100%',
                        height: '32px',
                    }}
                    className="form-date-picker"
                >
                    <Option value="Male">Name</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item className="btn-form-container">
                <Space>
                    <Button type="primary" className="user-profile-btn" onClick={onCancel}>
                        Hủy
                    </Button>
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={() => {
                            onSubmitForm(form.getFieldsValue());
                        }}
                        htmlType="submit"
                    >
                        Lưu
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
