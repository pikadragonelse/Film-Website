import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BillItem } from '../movies-package-bill-item';
import { Button, ConfigProvider, Spin } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss';
import { LogoDark } from '../../asset/icon/logoDark';
import axios from 'axios';
import Cookies from 'js-cookie';
import { VNPayReturnDataRaw, VNPayReturnDataRawDefault } from '../../model/VNPay';
import moment from 'moment';
import { getNextDateByMonth } from '../../utils/getNextDateByMonth';

import { endpoint } from '../../utils/baseUrl';

import { PaypalReturn, defaultPaypalReturn } from '../../model/paypal';
import { LoadingOutlined } from '@ant-design/icons';

const currentDate = new Date();


export const MoviesPackageBill = () => {
    const location = useLocation();
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [dataBillReturn, setDataBillReturn] =
        useState<VNPayReturnDataRaw>(VNPayReturnDataRawDefault);
    const [dataBilPaypalReturn, setDataBilPaypalReturn] =
        useState<PaypalReturn>(defaultPaypalReturn);
    const [dataUser, setDataUser] = useState<{ username?: string; email?: string }>({});
    const [billItems, setBillItems] = useState<{ title: string; content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const verifyBill = async () => {
        await axios
            .get(`${endpoint}/api/payments/vn-pay/verify` + location.search, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            .then((res) => setDataBillReturn(res.data.results))
            .catch((err) => console.log(err));
    };

    const getUserInfo = () => {
        axios
            .get(`${endpoint}/api/user/get-user`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                params: {
                    userId:
                        location.search.includes('vnp_Amount') === true
                            ? dataBillReturn.vnp_OrderInfo.split(' ')[0].split('_')[1]
                            : dataBilPaypalReturn?.userId,
                },
            })
            .then((res) => {
                setDataUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const verifyBillPaypal = async () => {
        await axios
            .post(
                'http://localhost:8000/api/payments/paypal/capture',
                { order_id: location.search.split('&')[0].split('?')[1].split('=')[1] },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken,
                    },
                },
            )
            .then((res) => {
                if (res.data.data.status !== 422 && res.data.data.name !== 'AxiosError') {
                    setDataBilPaypalReturn(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (location.search.includes('vnp_Amount') === true) {
            verifyBill();
        } else {
            verifyBillPaypal();
        }
    }, []);

    useEffect(() => {
        if (dataBilPaypalReturn.price !== 0) {
            setIsLoading(false);
        }
        handleDataReturn();
        getUserInfo();
    }, [dataBilPaypalReturn]);

    const handleDataReturn = () => {
        const arrCutInfo = dataBillReturn.vnp_OrderInfo.split(' ');

        const handledData = [
            {
                title: 'Tên gói',
                content:
                    location.search.includes('vnp_Amount') === true
                        ? arrCutInfo[arrCutInfo.length - 4] +
                          ' ' +
                          arrCutInfo[arrCutInfo.length - 3]
                        : dataBilPaypalReturn.subscriptionInfo.subscriptionType.name,
            },
            {
                title: 'Thời hạn',
                content:
                    location.search.includes('vnp_Amount') === true
                        ? arrCutInfo[arrCutInfo.length - 2] +
                          ' ' +
                          arrCutInfo[arrCutInfo.length - 1]
                        : dataBilPaypalReturn.subscriptionInfo.duration.time + ' tháng',
            },

            {
                title: 'Phương thức thanh toán',
                content:
                    location.search.includes('vnp_Amount') === true
                        ? 'VNPay, Bank: ' +
                          dataBillReturn.vnp_BankCode +
                          ', Card: ' +
                          dataBillReturn.vnp_CardType
                        : dataBilPaypalReturn.type,
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
                content:
                    location.search.includes('vnp_Amount') === true
                        ? moment(
                              getNextDateByMonth(Number(arrCutInfo[arrCutInfo.length - 2])),
                          ).format('DD/MM/YYYY')
                        : moment(
                              getNextDateByMonth(
                                  dataBilPaypalReturn.subscriptionInfo.duration.time,
                              ),
                          ).format('DD/MM/YYYY'),
            },
        ];
        setBillItems(handledData);
    };

    return (
        <ConfigProvider>
            <Spin
                indicator={
                    <LoadingOutlined style={{ fontSize: 36 }} spin className="text-red-600" />
                }
                spinning={isLoading}
            >
                <div className="bill-list">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="h-8 w-8 mr-2 mb-4">
                                <LogoDark />
                            </div>
                        </div>
                        <div className="text-gray-700">
                            <div className="text-sm">
                                Thời gian: {moment(currentDate).format('DD/MM/YYYY')}
                            </div>
                            <div className="text-sm">
                                MovTime ID:{' '}
                                {location.search.includes('vnp_Amount') === true
                                    ? dataBillReturn.vnp_ResponseCode
                                    : ''}
                            </div>
                        </div>
                    </div>
                    <div className="border-b-2 border-gray-100 pb-4 mb-4">
                        <h2 className="text-2xl font-bold mb-4">Người thanh toán</h2>
                        <p className="text-zinc-800 text-lg">
                            <span className="font-semibold">Username:</span> {dataUser.username}
                        </p>
                        <p className="text-zinc-800 text-lg">
                            <span className="font-semibold">Email:</span> {dataUser.email}
                        </p>
                    </div>
                    <ul className=" bill-list__info border-b-2 border-gray-100 pb-4 mb-4">
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
                        {location.search.includes('vnp_Amount') === true
                            ? (dataBillReturn.vnp_Amount / 100).toLocaleString('it-IT')
                            : dataBilPaypalReturn.price.toLocaleString('it-IT')}
                        &nbsp;₫
                    </div>
                    <Link to="/">
                        <Button className="bill-list__btn" type="primary">
                            Xác nhận
                        </Button>
                    </Link>
                </div>
            </Spin>
        </ConfigProvider>
    );
};
