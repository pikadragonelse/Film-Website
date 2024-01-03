import { Button, Descriptions, DescriptionsProps } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import Title from 'antd/es/typography/Title';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CurrentUser, defaultCurrentUser } from '../../model/user';
import { request } from '../../utils/request';
import { ModalUser } from '../modal-user';
import { FormChangePassword } from '../modal-user/form-change-password';
import { FormEditUser } from '../modal-user/form-edit-user';
import './index.scss';

export const UserProfile = () => {
    const moment = require('moment');
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenChangePassword, setIsOpenChangePassword] = useState<boolean>(false);
    //api currentUser
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultCurrentUser);

    const fetchDataCurrentUser = async () => {
        try {
            request
                .get('user/get-self-information', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    const userId = {
                        ...res.data,
                        avatarURL: res.data.avatarURL,
                    };
                    setCurrentUser(userId);
                })
                .catch((err) => console.log(err));
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
            <div key={currentUser.avatarURL} className="user-profile-general">
                <Avatar
                    src={currentUser.avatarURL}
                    srcSet=""
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
