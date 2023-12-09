import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import './index.scss';
import { request } from '../../../utils/request';
import { FilmItem } from '../../film-item';
import { useNavigate } from 'react-router-dom';

interface DropdownMenuProps {
    title: string;
    data: string[];
}

export const DropdownList: React.FC<DropdownMenuProps> = ({ title, data }) => {
    const columns = 3;
    const itemsPerColumn = Math.ceil(data.length / columns);
    const navigate = useNavigate();

    const [fetchedData, setFetchedData] = useState<FilmItem[]>([]);
    const handleItemClick = async (title: string, value: number, item: string) => {
        try {
            let response;
            if (title === 'Thể loại') {
                response = await request.get(
                    `movies?genre=${value + 1}&page=${1}&pageSize=${10000}`,
                );
            } else if (title === 'Quốc gia') {
                response = await request.get(`movies?nation=${item}&page=${1}&pageSize=${10000}`);
            } else if (title === 'Năm sản xuất') {
                response = await request.get(`movies?year=2023&page=${1}&pageSize=${10000}`);
            }

            setFetchedData(response?.data?.movies || []);
            navigate('/search', { state: { fetchedData: fetchedData } });
        } catch (error) {
            console.log(error);
        }
    };

    const renderMenuItems = (start: number, end: number): React.ReactNode => {
        return data.slice(start, end).map((item, index) => (
            <Menu.Item
                key={`item-${start + index}`}
                onClick={() => handleItemClick(title, start + index, item)}
            >
                {item && <React.Fragment>{item}</React.Fragment>}
            </Menu.Item>
        ));
    };

    const menu = (
        <Menu mode="horizontal" style={{ display: 'flex' }}>
            {Array.from({ length: columns }).map((_, columnIndex) => (
                <Menu.ItemGroup
                    key={`column-${columnIndex}`}
                    style={{ flex: 1, textAlign: 'start' }}
                >
                    {renderMenuItems(
                        columnIndex * itemsPerColumn,
                        (columnIndex + 1) * itemsPerColumn,
                    )}
                </Menu.ItemGroup>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <div className="dropdownlist">{title}</div>
            </div>
        </Dropdown>
    );
};
