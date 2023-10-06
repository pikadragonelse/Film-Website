import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BillItem } from '../movies-package-bill-item';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
export const MoviesPackageBill = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [selectedTerm, setSelectedTerm] = useState<{
        value: string;
        price: string;
    } | null>(null);

    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const [currentDate, setCurrentDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const termString = searchParams.get('selectedTerm');
        const label = searchParams.get('selectedLabel');

        if (termString) {
            const term = JSON.parse(termString);
            setSelectedTerm(term);
        }

        if (label) {
            setSelectedLabel(label);
        }

        const currentDateString = searchParams.get('currentDate');
        setCurrentDate(currentDateString || '');

        const endDateString = searchParams.get('endDate');
        setEndDate(endDateString || '');

        const currentTimeString = searchParams.get('currentTime');
        setCurrentTime(currentTimeString || '');
    }, [location.search]);

    const billItems = [
        {
            title: 'Tên người mua',
            content: 'Võ Yến Nhi',
        },
        {
            title: 'Tên gói',
            content: 'Vip 1',
        },
        {
            title: 'Thời hạn',
            content: selectedTerm ? selectedTerm.value : '',
        },

        {
            title: 'Trị giá',
            content: selectedTerm ? selectedTerm.price : '',
        },
        {
            title: 'Phương thức thanh toán',
            content: selectedLabel,
        },

        {
            title: 'Thời gian tạo đơn',
            content: `${currentTime} - ${currentDate}`,
        },
        {
            title: 'Ngày bắt đầu dịch vụ',
            content: currentDate,
        },
        {
            title: 'Ngày kết thúc dịch vụ',
            content: endDate,
        },
    ];

    return (
        <div className="bill-list">
            <h2 className="bill-list__title">Your Bill</h2>
            <ul className=" bill-list__info divide-y divide-gray-200 dark:divide-gray-700">
                {billItems.map((item, index) => (
                    <BillItem
                        key={index}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </ul>
            <Button className="bill-list__btn" type="primary">
                <Link to="/">Xác nhận</Link>
            </Button>
        </div>
    );
};
