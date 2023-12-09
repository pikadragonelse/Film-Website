import React from 'react';
import { Button } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
interface SummaryProps {
    selectedTerm: { value: string; price: string } | null;
    selectedLabel: string;
}

const currentDate = new Date();

const orderNumber = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();
const startDate = `${day}/${month}/${year}`;
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const currentTime = `${hours}:${minutes}`;

export const Summary: React.FC<SummaryProps> = ({ selectedTerm, selectedLabel }) => {
    let endDate = startDate;
    if (selectedTerm) {
        const additionalValue = parseFloat(selectedTerm.value);
        const endDateTimestamp =
            currentDate.getTime() + additionalValue * 30.5 * 24 * 60 * 60 * 1000;
        const endDateObject = new Date(endDateTimestamp);
        const endDay = endDateObject.getDate().toString().padStart(2, '0');
        const endMonth = (endDateObject.getMonth() + 1).toString().padStart(2, '0');
        const endYear = endDateObject.getFullYear();
        endDate = `${endDay}/${endMonth}/${endYear}`;
    }

    let x = 10000;
    let number = x.toLocaleString('it-IT');

    return (
        <div className="wrapper-summary">
            <div className="title-summary">Payment Details</div>
            <div className="information">
                <div className="user">
                    <div className="username">Username</div>
                    <div className="value">nguyenhatha</div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="term-package">
                    <div className="name-package">
                        <div className="">Tên gói</div>
                        <div className="value">VIP 1</div>
                    </div>
                    <div className="term">
                        <div className="">Thời hạn gói</div>
                        <div className="value">
                            {selectedTerm ? selectedTerm.value : '01 tháng'}
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
                        <div className="value">Khi bạn hủy</div>
                    </div>
                    <div className="time-end">
                        <div className="">Kỳ thanh toán tiếp theo</div>
                        <div className="value">{endDate}</div>
                    </div>
                </div>

                <hr className="my-4 border-neutral-300" />
                <div className="price-package">
                    <div className="price">
                        <div className="">Trị giá</div>
                        <div className="value">{selectedTerm ? selectedTerm.price : '69000 ₫'}</div>
                    </div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="method">
                    <div className="method-payment">
                        <div className="">Phương thức thanh toán</div>
                        <div className="value">{selectedLabel ? selectedLabel : 'Paypal'}</div>
                    </div>
                </div>
                <hr className="my-4 border-neutral-300" />
                <div className="total-price">
                    <div className="">Thành tiền</div>
                    <div className="value-1">
                        {selectedTerm ? selectedTerm.price : `${number} ₫`}
                    </div>
                </div>
                <div className="note">
                    Bằng việc xác nhận, bạn xác định đã đọc và đồng ý với{' '}
                    <a
                        style={{
                            color: 'var(--primary-color)',
                            fontWeight: '500',
                        }}
                    >
                        Hợp đồng và Chính sách
                    </a>{' '}
                    của MOVTIME.
                </div>
            </div>
            <Button className="btn-confirm" type="primary">
                <Link
                    to={`/bill?selectedTerm=${JSON.stringify(
                        selectedTerm,
                    )}&selectedLabel=${selectedLabel}&currentDate=${startDate}&endDate=${endDate}&currentTime=${currentTime}&orderNumber=${orderNumber}`}
                >
                    Xác nhận
                </Link>
            </Button>
        </div>
    );
};
