import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
import { TermPackage } from '../term-package';
import { request } from '../../utils/request';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppSelector } from '../../redux/hook';
import { getCurrentDateString } from '../../utils/getCurrentDate';
import { getNextDateByMonth } from '../../utils/getNextDateByMonth';
interface SummaryProps {
    selectedTerm: TermPackage | null;
    selectedMethod: number;
}

const methodShowMap: Record<number, string> = {
    1: 'Paypal',
    2: 'VNPay',
};

const startDate = getCurrentDateString();
export const Summary: React.FC<SummaryProps> = ({ selectedTerm, selectedMethod }) => {
    const [linkRedirect, setLinkRedirect] = useState('');
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const namePackage = useAppSelector((state) => state.VIPPayment.namePackage);
    const timeDuration = useAppSelector((state) => state.VIPPayment.durationValue);
    const totalPrice = useAppSelector((state) => state.VIPPayment.totalPrice);

    const [endDate, setEndDate] = useState(getNextDateByMonth(timeDuration));

    useEffect(() => {
        const newDate = getNextDateByMonth(timeDuration);

        setEndDate(newDate);
    }, [timeDuration]);

    const handleRecoverDate = () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        return getCurrentDateString(newDate);
    };

    const postOrder = async () => {
        return await axios
            .post('http://localhost:8000/api/payments/paypal', {
                subscriptionInfoId: 9,
            })
            .then((res) => {
                console.log(res);
                return res.data.id;
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        if (selectedMethod === 2) {
            paymentVNPay();
        }
    }, [selectedMethod]);

    async function onApprove(data: any) {
        return await request
            .post(
                'http://localhost:8000/api/payments/paypal/capture',
                {
                    orderID: data.orderID,
                },
                { headers: { 'Content-Type': 'application/json' } },
            )
            .then((orderData) => {
                console.log(orderData);
            })
            .catch((error) => {
                console.log(data);
                console.log('Catch', error);
            });
    }

    const paymentVNPay = async () => {
        await axios
            .post(
                'http://localhost:8000/api/payments/vn-pay',
                {
                    price: 100000,
                    ipAddress: '127.0.0.1',
                    subscriptionInfoId: 2,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then((response) => {
                console.log(response.data);
                setLinkRedirect(response.data.data.url);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="wrapper-summary">
            <div className="title-summary">Chi tiết thanh toán</div>
            <div className="information">
                <div className="user">
                    <div className="username">Người dùng</div>
                    <div className="value">nguyenhatha</div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="term-package">
                    <div className="name-package">
                        <div className="">Tên gói</div>
                        <div className="value">{namePackage}</div>
                    </div>
                    <div className="term">
                        <div className="">Thời hạn gói</div>
                        <div className="value">
                            {timeDuration >= 10 ? '' : 0}
                            {timeDuration || 1} tháng
                        </div>
                    </div>
                </div>

                <hr className="my-4 border-neutral-300" />
                <div className="time">
                    <div className="time-start">
                        <div className="">Ngày hiệu lực</div>
                        <div className="value">{startDate}</div>
                    </div>
                    <div className="time-start">
                        <div className="">Sử dụng đến</div>
                        <div className="value">{getCurrentDateString(endDate)}</div>
                    </div>
                    <div className="time-end">
                        <div className="">Kỳ thanh toán tiếp theo</div>
                        <div className="value">{handleRecoverDate()}</div>
                    </div>
                </div>

                <hr className="my-4 border-neutral-300" />
                <div className="price-package">
                    <div className="price">
                        <div className="">Trị giá</div>

                        <div className="value">
                            {totalPrice.toLocaleString('it-IT') || '---'}&nbsp;₫
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="method">
                    <div className="method-payment">
                        <div className="">Phương thức thanh toán</div>
                        <div className="value">{methodShowMap[selectedMethod]}</div>
                    </div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="total-price">
                    <div className="">Thành tiền</div>
                    <div className="value-1">
                        {totalPrice.toLocaleString('it-IT') || '---'}&nbsp;₫
                    </div>
                </div>
                <div className="note">
                    Bằng việc xác nhận, bạn xác định đã đọc và đồng ý với{' '}
                    <a
                        href="#"
                        style={{
                            color: 'var(--primary-color)',
                            fontWeight: '500',
                        }}
                    >
                        Hợp đồng và Chính sách{' '}
                    </a>
                    của MOVTIME.
                </div>
            </div>
            <div
                hidden={selectedMethod === 1 ? false : true}
                className="max-h-14 overflow-hidden mt-5 mb-[5.5px]"
            >
                <PayPalScriptProvider
                    options={{
                        clientId:
                            'ARs2ZSePnRG8bMCE8RBu6bTJo6HmLsv2u7IdPQXCw4yEEejKYtPz7BAv1jw5DfeC2Apwdddv2RPGi4Hs',
                        currency: 'USD',
                    }}
                >
                    <PayPalButtons onApprove={onApprove} createOrder={postOrder} />
                </PayPalScriptProvider>
            </div>
            <Button
                className={`btn-confirm ${selectedMethod === 2 ? 'flex' : 'hidden'}`}
                type="primary"
                href={linkRedirect}
            >
                Xác nhận
            </Button>
        </div>
    );
};
