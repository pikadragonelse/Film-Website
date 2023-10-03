import React from 'react';
import { Logo } from '../../asset/icon/logo';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import './index.scss';

interface HeaderPayProps {
    number: number;
}

export const HeaderPay: React.FC<HeaderPayProps> = ({ number }) => {
    return (
        <header className="wrapper-header-pay">
            <div className="flex justify-between items-center">
                <div className="logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
            </div>
            <div
                style={{
                    width: '60%',
                    marginRight: 'var(--spacing-lg)',
                }}
                className="flex justify-between w-full items-center"
            >
                <Steps
                    current={number}
                    items={[
                        {
                            title: 'Chọn gói',
                        },
                        {
                            title: 'Chọn thời hạn và phương thức thanh toán',
                        },
                        {
                            title: 'Kết quả',
                        },
                    ]}
                />
            </div>
        </header>
    );
};
