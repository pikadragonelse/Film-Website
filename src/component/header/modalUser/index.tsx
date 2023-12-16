import {
    HeartOutlined,
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
    <div className="flex items-center justify-center mb-[10px] item-user">
        <div className="mr-[10px]">{icon}</div>
        <div>{title}</div>
    </div>
);

export const ContentModalUser: React.FC = () => {
    const contentItems = [
        { icon: <UserOutlined />, title: 'Thông tin cá nhân' },
        { icon: <UnorderedListOutlined />, title: 'Sưu tập của tôi' },
        { icon: <HistoryOutlined />, title: 'Lịch sử xem' },
        { icon: <HeartOutlined />, title: 'Danh sách yêu thích' },
        { icon: <LogoutOutlined />, title: 'Đăng xuất' },
    ];

    return (
        <div>
            {contentItems.map((item, index) => (
                <div className="flex justify-between mt-2 hover:bg-[#e9e9e9] pt-3 px-3 cursor-pointer">
                    <ContentItem key={index} icon={item.icon} title={item.title} />
                    <RightOutlined className="ml-20 text-sm icon" />
                </div>
            ))}
        </div>
    );
};
