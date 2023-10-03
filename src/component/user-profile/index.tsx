import Avatar from 'antd/es/avatar/avatar';
import React, { useState } from 'react';
import './index.scss';
import Title from 'antd/es/typography/Title';
import { Button, Descriptions, DescriptionsProps, Form } from 'antd';
import { ModalUser } from '../modal-user';
import { FormEditUser } from '../modal-user/form-edit-user';
import { FormChangePassword } from '../modal-user/form-change-password';

const items2: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Email',
        children: '28072002long@gmail.com',
    },
    {
        key: '2',
        label: 'Ngày sinh',
        children: '28/07/2002',
    },
    {
        key: '3',
        label: 'Giới tính',
        children: 'Nam',
    },
    {
        key: '4',
        label: 'Phim đã xem',
        children: '25',
    },
    {
        key: '5',
        label: 'Phim yêu thích',
        children: '5',
    },
];

export type UserProfile = {};
export const UserProfile = () => {
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenChangePassword, setIsOpenChangePassword] =
        useState<boolean>(false);
    const [form] = Form.useForm();

    return (
        <div className="user-profile-container">
            <ModalUser open={isOpenEdit} onCancel={() => setIsOpenEdit(false)}>
                <FormEditUser onCancel={() => setIsOpenEdit(false)} />
            </ModalUser>
            <ModalUser
                open={isOpenChangePassword}
                onCancel={() => setIsOpenChangePassword(false)}
            >
                <FormChangePassword
                    onCancel={() => setIsOpenChangePassword(false)}
                />
            </ModalUser>
            <div className="user-profile-general">
                <Avatar
                    src="https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg"
                    size={160}
                    className="user-profile-avt"
                />
                <Title className="user-profile-username" level={3}>
                    Dragon Pi
                </Title>
            </div>
            <div className="user-profile-detail">
                <div className="user-profile-detail-content-container">
                    <Descriptions
                        items={items2}
                        className="user-profile-detail-content"
                        contentStyle={{ color: 'var(--contrast-color)' }}
                        labelStyle={{ color: 'var(--sub-color)' }}
                        column={3}
                        layout="vertical"
                    />
                    <div className="btn-container">
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={() => setIsOpenChangePassword(true)}
                        >
                            Đổi mật khẩu
                        </Button>
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={() => setIsOpenEdit(true)}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
