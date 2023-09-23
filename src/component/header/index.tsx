import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { Logo } from '../../asset/icon/logo';
import { Search } from '../header/search/index';
import items from '../header/menuItem.json';
import { Button, Avatar } from 'antd';
import { CrownOutlined, BellOutlined, LoginOutlined } from '@ant-design/icons';
import { DropdownList } from './dropdownList/index';

export const Header = () => {
    const scrollThreshold = 50;

    useEffect(() => {
        const header = document.querySelector('.wrapper-header') as HTMLElement;
        const handleScroll = () => {
            if (header) {
                if (window.scrollY > scrollThreshold) {
                    header.style.backgroundColor = 'var(--main-color)';
                } else {
                    header.style.backgroundColor = 'transparent';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const currentUser = false;
    return (
        <header className="wrapper-header">
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
                        className="hidden  items-center w-full lg:flex lg:w-auto lg:order-1"
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
                        <Link to="/profile">
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
                            <div className="login">
                                <LoginOutlined />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};
