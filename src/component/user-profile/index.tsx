import Avatar from 'antd/es/avatar/avatar';
import React, { useEffect, useState } from 'react';
import './index.scss';
import Title from 'antd/es/typography/Title';
import { Button, Descriptions, DescriptionsProps, Form } from 'antd';
import { ModalUser } from '../modal-user';
import { FormEditUser } from '../modal-user/form-edit-user';
import { FormChangePassword } from '../modal-user/form-change-password';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Cookies from 'js-cookie';
import { CurrentUser } from '../comment';
import { request } from '../../utils/request';

export type UserProfile = {};
export const UserProfile = () => {
    const moment = require('moment');
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState<boolean>(false);
    const [form] = Form.useForm();
    //api currentUser
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        username: '',
        email: '',
        avatarURL: '',
    });
    const fetchDataCurrentUser = async () => {
        try {
            const response = await request.get('user/get-self-information', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDataCurrentUser();
    }, [isOpenEdit]);

    const items2: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Email',
            children: currentUser.email,
        },
        {
            key: '2',
            label: 'Ngày sinh',
            children: moment(currentUser.dateOfBirth).format('YYYY-MM-DD'),
        },
        {
            key: '3',
            label: 'Giới tính',
            children: currentUser.gender,
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
    return (
        <div className="user-profile-container">
            <ModalUser open={isOpenEdit} onCancel={() => setIsOpenEdit(false)}>
                <FormEditUser
                    data={currentUser}
                    setIsOpenEdit={setIsOpenEdit}
                    onCancel={() => setIsOpenEdit(false)}
                />
            </ModalUser>
            <ModalUser open={isOpenChangePassword} onCancel={() => setIsOpenChangePassword(false)}>
                <FormChangePassword onCancel={() => setIsOpenChangePassword(false)} />
            </ModalUser>
            <div className="user-profile-general">
                <Avatar
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                    size={160}
                    className="user-profile-avt"
                />
                <Title className="user-profile-username" level={3}>
                    {currentUser.username}
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
