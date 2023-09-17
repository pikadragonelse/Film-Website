import React from 'react';
import './index.scss';
import { Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';

interface MenuItem {
    title: string;
    path: string;
    childrens?: MenuItem[];
}

interface DropdownMenuProps {
    title: string;
    data: MenuItem[];
}
export const DropdownList: React.FC<DropdownMenuProps> = ({ title, data }) => {
    const renderSubMenu = (item: MenuItem): React.ReactNode => {
        if (item.childrens && item.childrens.length > 0) {
            return (
                <Menu.SubMenu key={item.path} title={item.title}>
                    {item.childrens.map((child) => renderMenuItem(child))}
                </Menu.SubMenu>
            );
        } else {
            return renderMenuItem(item);
        }
    };

    const renderMenuItem = (item: MenuItem): React.ReactNode => {
        return (
            <Menu.Item key={item.path}>
                <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
        );
    };
    const menu = <Menu>{data.map((item) => renderSubMenu(item))}</Menu>;

    return (
        <Dropdown overlay={menu}>
            <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
            >
                <div className="dropdownlist">{title}</div>
            </div>
        </Dropdown>
    );
};
