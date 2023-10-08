import { BellOutlined, CrownOutlined, LoginOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../../asset/icon/logo';
import items from '../header/menuItem.json';
import { Search } from '../header/search/index';
import { DropdownList } from './dropdownList/index';
import './index.scss';

export type Header = { className?: string };
export const Header = ({ className }: Header) => {
    const location = useLocation();
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

    const currentUser = true;

    return (
        <header
            ref={headerRef}
            className={`wrapper-header ${
                isLoginPage ? 'hidden' : ''
            } ${className}`}
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
                                <DropdownList
                                    title={item.title}
                                    data={item.childrens || []}
                                />
                            </ul>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: '13rem',
                        marginRight: 'var(--spacing-lg)',
                    }}
                    className="flex justify-between items-center lg:order-2"
                >
                    <Link to={'/VIPpackage'}>
                        <Button
                            className="btn-vip"
                            type="primary"
                            icon={<CrownOutlined />}
                        >
                            VIP
                        </Button>
                    </Link>
                    <div className="notification">
                        <BellOutlined className="notification-btn" />
                        <p className="number-notification">12</p>
                    </div>
                    {currentUser ? (
                        <Link to="/foryou">
                            <Avatar
                                className="avatar"
                                style={{
                                    verticalAlign: 'middle',
                                }}
                                size="large"
                            >
                                user
                            </Avatar>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <div className="icon-login">
                                <LoginOutlined />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
