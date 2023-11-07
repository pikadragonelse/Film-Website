import './index.scss';
import React, { useState } from 'react';
import {
    UserOutlined,
    CrownOutlined,
    UnorderedListOutlined,
    CalendarOutlined,
    DeleteOutlined,
    SettingOutlined,
    HeartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { UserProfile } from '../../component/user-profile';
import { VIPPackageUser } from '../../component/VIP-package-user';
import { WatchLater } from '../../component/watch-later';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Thông tin cá nhân', 'profile', <UserOutlined />),
    getItem('Gói VIP', 'vip-package', <CrownOutlined />),
    getItem('Lịch sử xem', 'watch-later', <UnorderedListOutlined />),
    getItem('Phim xem sau', 'watched-movies', <CalendarOutlined />),
    getItem('Phim yêu thích', 'love-movies', <HeartOutlined />),
    getItem('Xóa tài khoản', 'delete-account', <DeleteOutlined />),
];

export const LayoutUser = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedPage, setSelectedPage] = useState('');
    const handleMenuClick = (item: MenuItem | null) => {
        if (item && item.key) {
            setSelectedPage(item.key.toString());
        }
    };

    let content = null;

    switch (selectedPage) {
        case 'profile':
            content = <UserProfile />;
            break;
        case 'vip-package':
            content = <VIPPackageUser />;
            break;
        case 'watch-later':
            content = <WatchLater />;
            break;
        case 'watched-movies':
            content = <div>Watched movies</div>;
            break;
        case 'love-movies':
            content = <div>Love movies</div>;
            break;
        case 'delete-account':
            content = <div>Delete account</div>;
            break;
        default:
            content = <UserProfile />;
    }
    return (
        <div className="wrapper-layout">
            <div className="header-layoutUser"></div>
            <div className="container">
                <Layout className="siderbar-nav">
                    <Sider
                        className="siderbar-nav-item"
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <Header className="header">
                            {collapsed ? (
                                <div className="icon-header">
                                    <SettingOutlined />
                                </div>
                            ) : (
                                <div className="title-header">For you</div>
                            )}
                        </Header>
                        <hr className=" border-neutral-400" />
                        <Menu
                            style={{
                                backgroundColor: '#1E1E1E',
                            }}
                            className="item"
                            defaultSelectedKeys={['profile']}
                            mode="inline"
                            items={items}
                            onClick={handleMenuClick}
                        />
                    </Sider>
                    <Layout>
                        <Content className="content-item">
                            <div className="content">
                                <Breadcrumb className="content-title"></Breadcrumb>
                                <div className="content-main"> {content}</div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};
