import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BillItem } from '../movies-package-bill-item';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { LogoDark } from '../../asset/icon/logoDark';
import axios from 'axios';
import Cookies from 'js-cookie';
import { VNPayReturnDataRaw, VNPayReturnDataRawDefault } from '../../model/VNPay';

export const MoviesPackageBill = () => {
    const location = useLocation();
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [dataBillReturn, setDataBillReturn] =
        useState<VNPayReturnDataRaw>(VNPayReturnDataRawDefault);

    const verifyBill = () => {
        axios
            .get('http://localhost:8000/api/payments/vn-pay/verify' + location.search, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((res) => setDataBillReturn(res.data.results))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        verifyBill();
    }, []);

    const currentDate = new Date();

    const billItems = [
        {
            title: 'Tên gói',
            content: 'Vip 1',
        },
        {
            title: 'Thời hạn',
            content: dataBillReturn.vnp_OrderInfo,
        },

        {
            title: 'Phương thức thanh toán',
            content: 'VNPay ' + dataBillReturn.vnp_BankCode + ' ' + dataBillReturn.vnp_CardType,
        },

        {
            title: 'Thời gian tạo đơn',
            content: `${new Date('20231212144602').toString()}`,
        },
        {
            title: 'Ngày bắt đầu dịch vụ',
            content: currentDate.toDateString(),
        },
        {
            title: 'Ngày kết thúc dịch vụ',
            content: currentDate.toDateString(),
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
                    <div className="text-sm">Date: {currentDate.toDateString()}</div>
                    <div className="text-sm">MovTime ID: {dataBillReturn.vnp_ResponseCode}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-100 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
                <div className="text-gray-800 mb-2">Yến Nhi</div>
                <div className="text-gray-700 mb-2">268 Âu Cơ St.</div>
                <div className="text-gray-700 mb-2">Đà Nẵng, Việt Nam </div>
                <div className="text-gray-700">yennhi@gmail.com</div>
            </div>
            <ul className=" bill-list__info border-b-2 border-gray-100 pb-8 mb-8">
                <div className="bill-list__info-head">
                    <p className="bill-list__info-title">Thông tin</p>
                    <p className="bill-list__info-value">Giá trị</p>
                </div>

                {billItems.map((item, index) => (
                    <BillItem key={index} title={item.title} content={item.content} />
                ))}
            </ul>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1.3rem',
                    marginBottom: '10px',
                }}
            >
                <span className="bill-list__bold">Tổng tiền </span>
                {dataBillReturn.vnp_Amount.toLocaleString('it-IT')}
            </div>

            <Button className="bill-list__btn" type="primary">
                <Link to="/">Xác nhận</Link>
            </Button>
        </div>
    );
};
