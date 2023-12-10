import './index.scss';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { LoveMovies } from '../../component/love-movie';
import { FilmItem } from '../../component/film-item';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';
import { HistoryMovies } from '../../component/history';
import { setDataCollect } from '../../redux/dataCollectSlide';

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
    getItem('Phim xem sau', 'watch-later', <UnorderedListOutlined />),
    getItem('Lịch sử xem', 'watched-movies', <CalendarOutlined />),
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
    //api lovemovie
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

    useEffect(() => {
        fetchDataLove();
    }, []);
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

    useEffect(() => {
        fetchDataCollect();
    }, []);
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

    useEffect(() => {
        fetchDataHistorymovies();
    }, []);
    switch (selectedPage) {
        case 'profile':
            content = <UserProfile />;
            break;
        case 'vip-package':
            content = <VIPPackageUser />;
            break;
        case 'watch-later':
            content = <WatchLater dataCollect={dataCollect} />;
            break;
        case 'watched-movies':
            content = <HistoryMovies dataHistorymovies={dataHistorymovies} />;
            break;
        case 'love-movies':
            content = <LoveMovies dataLovemovies={dataLovemovies} />;
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
                                <div className="title-header">Của bạn</div>
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
