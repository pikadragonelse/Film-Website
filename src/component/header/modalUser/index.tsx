import {
    HistoryOutlined,
    LogoutOutlined,
    RightOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React from 'react';

interface ContentItemProps {
    icon: JSX.Element;
    title: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ marginRight: '10px' }}>{icon}</div>
        <div>{title}</div>
    </div>
);

export const ContentModalUser: React.FC = () => {
    const contentItems = [
        { icon: <UserOutlined />, title: 'Thông tin cá nhân' },
        { icon: <UnorderedListOutlined />, title: 'Sưu tập của tôi' },
        { icon: <HistoryOutlined />, title: 'Lịch sử xem' },
        { icon: <LogoutOutlined />, title: 'Đăng xuất' },
    ];

    return (
        <div>
            {contentItems.map((item, index) => (
                <div className="flex justify-between mt-2 hover:bg-[#2c2e33] pt-3 px-4 cursor-pointer ">
                    <ContentItem key={index} icon={item.icon} title={item.title} />
                    <RightOutlined className="ml-10 text-sm" />
                </div>
            ))}
        </div>
    );
};
