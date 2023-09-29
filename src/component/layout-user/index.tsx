import './index.scss';
import React, { useState } from 'react';
import {
    UserOutlined,
    CrownOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    DeleteOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { HomePage } from '../../page/home';
import { VIPPackageUser } from '../../page/VIP-package-user';
import { WatchLater } from '../../page/watch-later';

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
    getItem('Profile', 'profile', <UserOutlined />),
    getItem('VIP package', 'vip-package', <CrownOutlined />),
    getItem('Watch later', 'watch-later', <UnorderedListOutlined />),
    getItem('Watched movies', 'watched-movies', <OrderedListOutlined />),
    getItem('Delete account', 'delete-account', <DeleteOutlined />),
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
            content = <HomePage />;
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
        case 'delete-account':
            content = <div>Delete account</div>;
            break;
        default:
            content = <HomePage />;
    }
    return (
        <div className="wrapper">
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
                                <Breadcrumb className="content-title">
                                    <Breadcrumb.Item>Foryou</Breadcrumb.Item>
                                    <Breadcrumb.Item className="content-title-select-page">
                                        {selectedPage}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="content-main"> {content}</div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};
