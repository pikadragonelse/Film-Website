import Avatar from 'antd/es/avatar/avatar';
import React, { useState } from 'react';
import './index.scss';
import Title from 'antd/es/typography/Title';
import {
    Button,
    DatePicker,
    Descriptions,
    DescriptionsProps,
    Input,
    Modal,
    Tabs,
} from 'antd';

const items2: DescriptionsProps['items'] = [
    {
        key: '1',
        label: 'Email',
        children: '28072002long@gmail.com',
    },
    {
        key: '2',
        label: 'Date of birth',
        children: '28/07/2002',
    },
    {
        key: '3',
        label: 'Watched film',
        children: '25',
    },
    {
        key: '4',
        label: 'Favorite film',
        children: '5',
    },
];

export type UserProfile = {};
export const UserProfile = () => {
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    return (
        <div className="user-profile-container">
            <Modal
                title="Title"
                open={isOpenEdit}
                onCancel={() => setIsOpenEdit(false)}
                footer={[
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={() => setIsOpenEdit(false)}
                    >
                        Cancel
                    </Button>,
                    <Button
                        type="primary"
                        className="user-profile-btn"
                        onClick={() => setIsOpenEdit(false)}
                    >
                        Edit
                    </Button>,
                ]}
            ></Modal>
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
                        column={2}
                        layout="vertical"
                    />
                    <div className="btn-container">
                        <Button type="primary" className="user-profile-btn">
                            Change password
                        </Button>
                        <Button
                            type="primary"
                            className="user-profile-btn"
                            onClick={() => setIsOpenEdit(true)}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
