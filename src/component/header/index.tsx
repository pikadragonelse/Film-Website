import {
    BellOutlined,
    CrownOutlined,
    HistoryOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Popover, Tooltip } from 'antd';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import { setIslogin, setUsername } from '../../redux/isLoginSlice';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import { Search } from '../header/search/index';
import { DropdownList } from './dropdownList/index';
import './index.scss';
import { ContentModalUser } from './modalUser';
import { ContentModalVip } from './modalVip';
import { ContentModalVipTitle } from './modalVipTitle';
import { ContentModalHistory } from './modalHistory';
import { ContentModalHistoryTitle } from './modalHistoryTitle';
export type Header = { className?: string };

const queryParamMap: Record<string, string> = {
    nations: 'nation',
    releasedYears: 'year',
    genres: 'genre',
};

export type Genre = {
    genre_id: number;
    name: string;
};

export interface ChildrenCategoriesHeader {
    id: string;
    value: string;
}

export interface CategoriesHeader {
    title?: string;
    children?: ChildrenCategoriesHeader[];
    queryParam?: string;
}

export interface CurrentUser {
    username: string;
    avatarURL: string;
}

export const Header = ({ className }: Header) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [items, setItems] = useState<any[]>([]);
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        username: '',
        avatarURL: '',
    });

    const isLoginPage =
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/forget' ||
        location.pathname === '/payment';

    const scrollThreshold = 50;

    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const header = document.querySelector('.wrapper-header') as HTMLElement;
        const handleScroll = () => {
            if (header) {
                if (window.scrollY > scrollThreshold) {
                    headerRef.current?.classList.add('scroll-header');
                } else {
                    headerRef.current?.classList.remove('scroll-header');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const storedUsername = Cookies.get('username');

        if (accessToken) {
            dispatch(setIslogin(true));

            if (storedUsername) {
                dispatch(setUsername(storedUsername));
                fetchDataCurrentUser();
            }
        }
    }, [dispatch]);

    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const username = useSelector((state: RootState) => state.user.username);

    const handleLogin = useCallback(async () => {
        const storedUsername = Cookies.get('username');
        dispatch(setIslogin(true));

        if (storedUsername) {
            dispatch(setUsername(storedUsername));
        }

        await fetchDataCurrentUser();
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        Cookies.remove('accessToken');
        Cookies.remove('username');
        dispatch(setIslogin(false));
        dispatch(setUsername(null));
    }, [dispatch]);

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

    const fetchItems = async () => {
        try {
            const response = await request.get('home/headers');

            const data = response.data.data;
            const listKey = Object.keys(data);
            const nations: ChildrenCategoriesHeader[] = data.nations.map((nation: string) => {
                return { id: nation, value: nation };
            });
            const releasedYears: ChildrenCategoriesHeader[] = data.releasedYears.map(
                (year: string) => {
                    return { id: year, value: year };
                },
            );
            const genres: ChildrenCategoriesHeader[] = data.genres.map((genre: Genre) => {
                return { id: genre.genre_id, value: genre.name };
            });
            const itemsHeader: CategoriesHeader[] = [
                {
                    title: 'Thể loại',
                    children: genres,
                    queryParam: queryParamMap[listKey[2]],
                },
                { title: 'Quốc gia', children: nations, queryParam: queryParamMap[listKey[0]] },
                {
                    title: 'Năm sản xuất',
                    children: releasedYears,
                    queryParam: queryParamMap[listKey[1]],
                },
            ];
            setItems(itemsHeader);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchItems();
    }, []);
    return (
        <header
            ref={headerRef}
            className={`wrapper-header ${isLoginPage ? 'hidden' : ''} ${className}`}
        >
            <div
                style={{
                    marginLeft: 'var(--spacing-lg)',
                }}
                className="flex justify-between items-center mx-auto"
            >
                <div className="flex justify-between items-center">
                    <div className="logo">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <div
                        style={{
                            marginRight: 'var(--spacing-lg)',
                        }}
                        className="items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <Search />
                        {items.map((item, index) => (
                            <ul className="menu-items " key={index}>
                                <DropdownList
                                    title={item.title}
                                    data={item.children}
                                    queryParam={item.queryParam}
                                />
                            </ul>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: isLogin ? '21rem' : '16rem',
                        marginRight: 'var(--spacing-lg)',
                    }}
                    className="flex justify-between items-center lg:order-2 mt-2"
                >
                    {isLogin ? (
                        <>
                            <Popover
                                title={ContentModalHistoryTitle}
                                overlayStyle={{ maxWidth: '30%' }}
                                content={<ContentModalHistory />}
                                zIndex={9999}
                            >
                                <Link to="/foryou">
                                    <HistoryOutlined className="icon-login" />
                                </Link>
                            </Popover>
                        </>
                    ) : null}
                    <Popover
                        title={<ContentModalVipTitle />}
                        overlayStyle={{ maxWidth: '20%' }}
                        content={<ContentModalVip />}
                        arrow={false}
                        zIndex={9999}
                    >
                        <Link to={'/VIPpackage'}>
                            <Button className="btn-vip" type="primary" icon={<CrownOutlined />}>
                                VIP
                            </Button>
                        </Link>
                    </Popover>

                    <div className="notification">
                        <BellOutlined className="notification-btn" />
                        <p className="number-notification">12</p>
                    </div>
                    {isLogin ? (
                        <>
                            <Popover
                                title={
                                    <div className="p-2 flex font-normal items-center justify-center border-b-[1px] border-[#989898]">
                                        <Avatar className="mr-4 mb-2" src={currentUser.avatarURL} />
                                        {currentUser.username}
                                    </div>
                                }
                                overlayStyle={{ maxWidth: '30%' }}
                                content={<ContentModalUser />}
                                zIndex={9999}
                            >
                                <Link
                                    to="/foryou/profile"
                                    onClick={() => {
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    {currentUser.avatarURL ? (
                                        <Avatar
                                            className="avatar"
                                            src={currentUser.avatarURL}
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                            size="default"
                                        />
                                    ) : (
                                        <Avatar
                                            className="avatar"
                                            icon={<UserOutlined />}
                                            style={{
                                                verticalAlign: 'middle',
                                            }}
                                            size="default"
                                        />
                                    )}
                                </Link>
                            </Popover>
                            <Tooltip title="Đăng xuất">
                                <div className="icon-login">
                                    <LogoutOutlined onClick={handleLogout} />
                                </div>
                            </Tooltip>
                        </>
                    ) : (
                        <Link to="/login">
                            <div className="icon-login">
                                <LoginOutlined onClick={handleLogin} />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
