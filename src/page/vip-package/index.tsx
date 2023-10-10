import React from 'react';
import { HeaderPay } from '../../component/header-pay';
import Title from 'antd/es/typography/Title';
import { Button, List, Table } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import './index.scss';
import { ColumnsType } from 'antd/es/table';
import { ListVipPackage } from '../../component/list-vip-package';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';

const data = [
    {
        title: 'Xem mọi nội dung bạn muốn. Không có quảng cáo.',
    },
    {
        title: 'Đề xuất dành riêng cho bạn.',
    },
    {
        title: 'Thay đổi hoặc hủy gói dịch vụ của bạn bất cứ khi nào.',
    },
];

interface DataType {
    key: string;
    name: string;
    borrow: number;
    repayment: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: '',
        dataIndex: 'name',
    },
    {
        title: '',
        dataIndex: 'borrow',
    },
    {
        title: '',
        dataIndex: 'repayment',
    },
];

const dataTable: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        borrow: 10,
        repayment: 33,
    },
    {
        key: '2',
        name: 'Jim Green',
        borrow: 100,
        repayment: 0,
    },
    {
        key: '3',
        name: 'Joe Black',
        borrow: 10,
        repayment: 10,
    },
    {
        key: '4',
        name: 'Jim Red',
        borrow: 75,
        repayment: 45,
    },
    {
        key: '5',
        name: 'John Brown',
        borrow: 10,
        repayment: 33,
    },
    {
        key: '6',
        name: 'Jim Green',
        borrow: 100,
        repayment: 0,
    },
    {
        key: '7',
        name: 'Joe Black',
        borrow: 10,
        repayment: 10,
    },
    {
        key: '8',
        name: 'Jim Red',
        borrow: 75,
        repayment: 45,
    },
    {
        key: '9',
        name: 'John Brown',
        borrow: 10,
        repayment: 33,
    },
    {
        key: '10',
        name: 'Jim Green',
        borrow: 100,
        repayment: 0,
    },
    {
        key: '11',
        name: 'Joe Black',
        borrow: 10,
        repayment: 10,
    },
    {
        key: '12',
        name: 'Jim Red',
        borrow: 75,
        repayment: 45,
    },
];

export const VIPPackage = () => {
    return (
        <div className="wrapper-vip-package">
            <HeaderPay />
            <div className="vip-package-body">
                <Title level={2} className="vip-package-title">
                    Chọn gói dịch vụ phù hợp với bạn
                </Title>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <CheckOutlined className="vip-package-list-icon" />
                                }
                                title={item.title}
                                className="vip-package-list-item"
                            />
                        </List.Item>
                    )}
                />
                <ListVipPackage className="list-vip-package" />
                <Paragraph className="list-vip-package-policy">
                    Việc bạn có thể xem ở chế độ HD (720p), Full HD (1080p),
                    Ultra HD (4K) và HDR hay không phụ thuộc vào dịch vụ
                    internet và khả năng của thiết bị. Không phải tất cả nội
                    dung đều có sẵn ở mọi độ phân giải. Xem{' '}
                    <a href="#">Điều khoản sử dụng</a> của chúng tôi để biết
                    thêm chi tiết.
                </Paragraph>
                <Link to={'/payment'} className="list-vip-package-btn">
                    Tiếp theo
                </Link>
            </div>
        </div>
    );
};
