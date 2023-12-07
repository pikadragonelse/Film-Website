import {
    BellOutlined,
    ClockCircleOutlined,
    CrownOutlined,
    LoginOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import { setIslogin, setUsername } from '../../redux/isLoginSlice';
import { RootState } from '../../redux/store';
import items from '../header/menuItem.json';
import { Search } from '../header/search/index';
import { DropdownList } from './dropdownList/index';
import './index.scss';
import { ContentModalHistory } from './modalHistory';
import { ContentModalHistoryTitle } from './modalHistoryTitle';
import { ContentModalVip } from './modalVip';
import { ContentModalVipTitle } from './modalVipTitle';
import { ContentModalUser } from './modalUser';
export type Header = { className?: string };

export const Header = ({ className }: Header) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const isLoginPage =
        location.pathname === '/login' ||
        location.pathname === '/register' ||
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
            }
        }
    }, [dispatch]);

    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const username = useSelector((state: RootState) => state.user.username);

    console.log('isLogin :', isLogin);
    console.log('username :', username);

    const handleLogin = () => {
        const storedUsername = Cookies.get('username');
        console.log('storedUsername', storedUsername);
        dispatch(setIslogin(true));

        if (storedUsername) {
            dispatch(setUsername(storedUsername));
        }
    };

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('username');
        dispatch(setIslogin(false));
        dispatch(setUsername(null));
    };

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
                            <ul className="menu-items" key={index}>
                                <DropdownList title={item.title} data={item.childrens || []} />
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
                    <Popover
                        title={<ContentModalHistoryTitle />}
                        overlayStyle={{ maxWidth: '40%' }}
                        content={<ContentModalHistory />}
                    >
                        <div className="icon-history">
                            <ClockCircleOutlined />
                        </div>
                    </Popover>
                    <Popover
                        title={<ContentModalVipTitle />}
                        overlayStyle={{ maxWidth: '20%' }}
                        content={<ContentModalVip />}
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
                                        <Avatar
                                            className="mr-4 mb-2"
                                            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                                        />
                                        {username}
                                    </div>
                                }
                                overlayStyle={{ maxWidth: '30%' }}
                                content={<ContentModalUser />}
                            >
                                <Link to="/foryou">
                                    <Avatar
                                        className="avatar"
                                        src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        size="default"
                                    ></Avatar>
                                </Link>
                            </Popover>
                            <div className="icon-login">
                                <LogoutOutlined onClick={handleLogout} />
                            </div>
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
