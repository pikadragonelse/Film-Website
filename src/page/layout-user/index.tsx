import {
    CalendarOutlined,
    CrownOutlined,
    DeleteOutlined,
    HeartOutlined,
    SettingOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { VIPPackageUser } from '../../component/VIP-package-user';
import { FilmItem } from '../../component/film-item';
import { HistoryMovies } from '../../component/history';
import { LoveMovies } from '../../component/love-movie';
import { UserProfile } from '../../component/user-profile';
import { WatchLater } from '../../component/watch-later';
import { request } from '../../utils/request';
import './index.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

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
    getItem(
        'Thông tin cá nhân',
        '/foryou/profile',
        <Link to={'/foryou/profile'}>
            <UserOutlined />
        </Link>,
    ),
    getItem(
        'Gói VIP',
        '/vip-package',
        <Link to={'/foryou/vip-package'}>
            <CrownOutlined />
        </Link>,
    ),
    getItem(
        'Phim xem sau',
        '/watch-later',
        <Link to={'/foryou/watch-later'}>
            <UnorderedListOutlined />
        </Link>,
    ),
    getItem(
        'Lịch sử xem',
        '/watched-movies',
        <Link to={'/foryou/watched-movies'}>
            <CalendarOutlined />
        </Link>,
    ),
    getItem(
        'Phim yêu thích',
        '/love-movies',
        <Link to={'/foryou/love-movies'}>
            <HeartOutlined />
        </Link>,
    ),
    getItem(
        'Xóa tài khoản',
        '/delete-account',
        <Link to={'/foryou/delete-account'}>
            <DeleteOutlined />
        </Link>,
    ),
];

export const LayoutUser = () => {
    const [collapsed, setCollapsed] = useState(false);
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [dataLovemovies, setDataLovemovies] = useState<FilmItem[]>([]);
    const fetchDataLove = async () => {
        try {
            const response = await request.get('user/get-favorite-movie-list?page=1&pageSize=10', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataLovemovies(data);
        } catch (error) {
            console.error(error);
        }
    };

    //api watch late
    const [dataCollect, setDataCollect] = useState<FilmItem[]>([]);
    const fetchDataCollect = async () => {
        try {
            const response = await request.get('user/get-watch-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataCollect(data);
        } catch (error) {
            console.error(error);
        }
    };

    //api history
    const [dataHistorymovies, setDataHistorymovies] = useState<FilmItem[]>([]);
    const fetchDataHistorymovies = async () => {
        try {
            const response = await request.get('user/get-movie-history-list?page=1&pageSize=1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataHistorymovies(data);
        } catch (error) {
            console.error(error);
        }
    };
    const { pathname } = useLocation();
    useEffect(() => {
        fetchDataCollect();
        fetchDataHistorymovies();
        fetchDataLove();
    }, [pathname]);
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
                                <div className="title-header">Dành cho bạn</div>
                            )}
                        </Header>
                        <hr className="mt-2 border-neutral-600" />

                        <Menu
                            style={{
                                backgroundColor: '#1E1E1E',
                            }}
                            className="item"
                            defaultSelectedKeys={['profile']}
                            mode="inline"
                            items={items}
                            selectedKeys={[pathname]}
                        />
                    </Sider>
                    <Layout>
                        <Content className="content-item">
                            <div className="content">
                                <Breadcrumb className="content-title"></Breadcrumb>
                                <div className="content-main">
                                    <Routes>
                                        <Route path="/profile" element={<UserProfile />} />
                                        <Route path="/vip-package" element={<VIPPackageUser />} />
                                        <Route
                                            path="/watch-later"
                                            element={<WatchLater dataCollect={dataCollect} />}
                                        />
                                        <Route
                                            path="/watched-movies"
                                            element={
                                                <HistoryMovies
                                                    dataHistorymovies={dataHistorymovies}
                                                />
                                            }
                                        />
                                        <Route
                                            path="/love-movies"
                                            element={<LoveMovies dataLovemovies={dataLovemovies} />}
                                        />
                                        <Route
                                            path="/delete-account"
                                            element={<div>Delete account</div>}
                                        />
                                    </Routes>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </div>
    );
};
