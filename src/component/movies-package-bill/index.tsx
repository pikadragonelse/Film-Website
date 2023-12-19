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
import moment from 'moment';
import { getNextDateByMonth } from '../../utils/getNextDateByMonth';

export const MoviesPackageBill = () => {
    const location = useLocation();
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [dataBillReturn, setDataBillReturn] =
        useState<VNPayReturnDataRaw>(VNPayReturnDataRawDefault);
    const [dataUser, setDataUser] = useState<{ username?: string; email?: string }>({});

    const verifyBill = () => {
        axios
            .get(
                'http://movies.southeastasia.cloudapp.azure.com:8000/api/payments/vn-pay/verify' +
                    location.search,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken,
                    },
                },
            )
            .then((res) => setDataBillReturn(res.data.results))
            .catch((err) => console.log(err));
    };

    const getUserInfo = () => {
        axios
            .get('http://movies.southeastasia.cloudapp.azure.com:8000/api/user/get-user', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                params: { userId: dataBillReturn.vnp_OrderInfo.split(' ')[0].split('_')[1] },
            })
            .then((res) => {
                setDataUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        verifyBill();
        getUserInfo();
    }, []);

    const currentDate = new Date();

    const arrCutInfo = dataBillReturn.vnp_OrderInfo.split(' ');

    const billItems = [
        {
            title: 'Tên gói',
            content: arrCutInfo[arrCutInfo.length - 4] + ' ' + arrCutInfo[arrCutInfo.length - 3],
        },
        {
            title: 'Thời hạn',
            content: arrCutInfo[arrCutInfo.length - 2] + ' ' + arrCutInfo[arrCutInfo.length - 1],
        },

        {
            title: 'Phương thức thanh toán',
            content:
                'VNPay, Bank: ' +
                dataBillReturn.vnp_BankCode +
                ', Card: ' +
                dataBillReturn.vnp_CardType,
        },

        {
            title: 'Thời gian tạo đơn',
            content: moment(currentDate).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày bắt đầu dịch vụ',
            content: moment(currentDate).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày kết thúc dịch vụ',
            content: moment(getNextDateByMonth(Number(arrCutInfo[arrCutInfo.length - 2]))).format(
                'DD/MM/YYYY',
            ),
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
                    <div className="text-sm">
                        Thời gian: {moment(currentDate).format('DD/MM/YYYY')}
                    </div>
                    <div className="text-sm">MovTime ID: {dataBillReturn.vnp_ResponseCode}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-100 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Người Thanh toán</h2>
                <p className="text-zinc-800 text-lg">
                    <span className="font-semibold">Username:</span> {dataUser.username}
                </p>
                <p className="text-zinc-800 text-lg">
                    <span className="font-semibold">Email:</span> {dataUser.email}
                </p>
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
                {(dataBillReturn.vnp_Amount / 100).toLocaleString('it-IT')}
            </div>

            <Button className="bill-list__btn" type="primary">
                <Link to="/">Xác nhận</Link>
            </Button>
        </div>
    );
};
