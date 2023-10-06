import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BillItem } from '../movies-package-bill-item';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { LogoDark } from '../../asset/icon/logoDark';

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
    const [orderNumber, setOrderNumber] = useState('');

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

        const orderNumberString = searchParams.get('orderNumber');
        setOrderNumber(orderNumberString || '');
    }, [location.search]);

    const billItems = [
        {
            title: 'Tên gói',
            content: 'Vip 1',
        },
        {
            title: 'Thời hạn',
            content: selectedTerm ? selectedTerm.value : '',
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

        {
            title: <span className='bill-list__bold'>Trị giá</span>,
            content: <span className='bill-list__red'>{selectedTerm ? selectedTerm.price : ''}</span>,

        },

    ];

    return (
        <div className="bill-list">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <div className="h-8 w-8 mr-2 mb-4">
                        <LogoDark />
                    </div>

                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-xl mb-2">MOVTIME</div>
                    <div className="text-sm">Date: {currentDate}</div>
                    <div className="text-sm">MovTime ID: {orderNumber}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                <div className="text-gray-700 mb-2">Yến Nhi</div>
                <div className="text-gray-700 mb-2">268 Âu Cơ St.</div>
                <div className="text-gray-700 mb-2">Đà Nẵng, Việt Nam </div>
                <div className="text-gray-700">yennhi@gmail.com</div>
            </div>
            <ul className=" bill-list__info ">
                <div className='bill-list__info-head'>
                    <p className="bill-list__info-title">Thông tin</p>
                    <p className="bill-list__info-value">Giá trị</p>
                </div>

                {
                    billItems.map((item, index) => (
                        <BillItem
                            key={index}
                            title={item.title}
                            content={item.content}
                        />
                    ))
                }

            </ul >
            <Button className="bill-list__btn" type="primary">
                <Link to="/">Xác nhận</Link>
            </Button>
        </div >
    );
};
