import React, { useState, useEffect } from 'react';
import { Button, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import './index.scss';

interface DataType {
    key: string;
    id: string;
    namePackage: string;
    term: string;
    tags: string;
    price: string;
    startDay: string;
    endDay: string;
}
const data: DataType[] = [
    {
        key: '1',
        id: 'ID1',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '2',
        id: 'ID2',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '3',
        id: 'ID3',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '4',
        id: 'ID4',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '5',
        id: 'ID5',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '6',
        id: 'ID6',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '7',
        id: 'ID7',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '8',
        id: 'ID8',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '9',
        id: 'ID9',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '10',
        id: 'ID10',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '11',
        id: 'ID11',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '4',
        id: 'ID4',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '5',
        id: 'ID5',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '6',
        id: 'ID6',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '7',
        id: 'ID7',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '18',
        id: 'ID18',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '20',
        id: 'ID20',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '21',
        id: 'ID21',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '3',
        id: 'ID3',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '4',
        id: 'ID4',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '5',
        id: 'ID5',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'active',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
    {
        key: '8',
        id: 'ID30',
        namePackage: 'VIP1',
        term: '1 tháng',
        tags: 'inactive',
        price: '79000 VND',
        startDay: '23/01/2023',
        endDay: '23/02/2023',
    },
];
const columns: ColumnsType<DataType> = [
    {
        title: 'ID giao dịch',
        dataIndex: 'id',
        key: 'id',
        render: (text, id) => <Link to={`/billpayment-${id.key}`}>{text}</Link>,
    },
    {
        title: 'Tên gói',
        dataIndex: 'namePackage',
        key: 'namePackage',
    },
    {
        title: 'Thời hạn',
        dataIndex: 'term',
        key: 'term',
    },
    {
        title: 'Trạng thái',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => {
            let color;
            if (tags === 'inactive') {
                color = 'volcano';
            } else {
                color = 'green';
            }
            return (
                <Tag color={color} key={tags}>
                    {tags.toUpperCase()}
                </Tag>
            );
        },
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'startDay',
        key: 'startDay',
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'endDay',
        key: 'endDay',
    },
];
const paginationConfig = {
    defaultPageSize: 8,
    total: data.length,
};

export const VIPPackageUser = () => {
    const [haveVIP, setHaveVIP] = useState(false);

    useEffect(() => {
        if (paginationConfig.total > 0) {
            setHaveVIP(true);
        }
    }, []);
    console.log(paginationConfig.total);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageData, setCurrentPageData] = useState(
        data.slice(0, paginationConfig.defaultPageSize),
    );

    const handlePageChange = (page: number) => {
        const startIndex = (page - 1) * paginationConfig.defaultPageSize;
        const endIndex = startIndex + paginationConfig.defaultPageSize;
        const currentPageData = data.slice(startIndex, endIndex);
        setCurrentPage(page);
        setCurrentPageData(currentPageData);
    };
    const shouldShowPagination = paginationConfig.total > 8;

    return (
        <div className="content-VIP-package">
            {haveVIP ? (
                <Table
                    columns={columns}
                    dataSource={currentPageData}
                    pagination={
                        shouldShowPagination
                            ? {
                                  ...paginationConfig,
                                  current: currentPage,
                                  onChange: handlePageChange,
                              }
                            : false
                    }
                />
            ) : (
                <div className="btn-buy-now">
                    <Link to="/VIP-package">
                        <Button size="large">Buy now</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
