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
    subscriptionInfoId: number;
    discount: number;
}

const methodShowMap: Record<number, string> = {
    1: 'Paypal',
    2: 'VNPay',
};

const startDate = getCurrentDateString();
export const Summary: React.FC<SummaryProps> = ({
    subscriptionInfoId = 0,
    selectedMethod,
    discount,
}) => {
    const [linkRedirect, setLinkRedirect] = useState('');
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const { namePackage, durationValue, totalPrice } = useAppSelector((state) => state.VIPPayment);

    const [endDate, setEndDate] = useState(getNextDateByMonth(durationValue));

    useEffect(() => {
        const newDate = getNextDateByMonth(durationValue);

        setEndDate(newDate);
    }, [durationValue]);

    const handleRecoverDate = () => {
        const newDate = new Date(endDate);
        newDate.setDate(newDate.getDate() + 1);

        return getCurrentDateString(newDate);
    };

    const postOrder = async () => {
        return await axios
            .post(
                'http://localhost:8000/api/payments/paypal',
                {
                    subscriptionInfoId: subscriptionInfoId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then((res) => {
                console.log(res);

                setLinkRedirect(res.data.data);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        if (selectedMethod === 2) {
            paymentVNPay();
        } else if (selectedMethod === 1) {
            postOrder();
        }
    }, [selectedMethod]);

    const paymentVNPay = async () => {
        await axios
            .post(
                'http://localhost:8000/api/payments/vn-pay',
                {
                    price: 100000,
                    ipAddress: '127.0.0.1',
                    subscriptionInfoId: subscriptionInfoId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            )
            .then((response) => {
                setLinkRedirect(response.data.data.url);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="wrapper-summary">
            <div className="title-summary">Chi tiết thanh toán</div>
            <div className="information">
                <div className="term-package">
                    <div className="name-package">
                        <div className="">Tên gói</div>
                        <div className="value">{namePackage}</div>
                    </div>
                    <div className="term">
                        <div className="">Thời hạn gói</div>
                        <div className="value">
                            {durationValue >= 10 ? '' : 0}
                            {durationValue || 1} tháng
                        </div>
                    </div>
                </div>

                <hr className="my-2 border-neutral-300" />
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

                <hr className="my-2 border-neutral-300" />
                <div className="price-package">
                    <div className="price">
                        <div className="">Trị giá</div>
                        <div className="value">
                            {totalPrice.toLocaleString('it-IT') || '---'}&nbsp;₫
                        </div>
                    </div>
                    <div className="price">
                        <div className="">Giảm giá</div>
                        <div className="value">
                            {discount !== 0 ? discount * 100 : '---'}&nbsp;%
                        </div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="method">
                    <div className="method-payment">
                        <div className="">Phương thức thanh toán</div>
                        <div className="value">{methodShowMap[selectedMethod]}</div>
                    </div>
                </div>
                <hr className="my-2 border-neutral-300" />
                <div className="total-price">
                    <div className="">Thành tiền</div>
                    <div className="value-1">
                        {(totalPrice - totalPrice * discount).toLocaleString('it-IT') || '---'}
                        &nbsp;₫
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
            <Button className={`btn-confirm flex`} type="primary" href={linkRedirect}>
                Xác nhận
            </Button>
        </div>
    );
};
