import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from './header-pay';
import { MethodPayment } from './method-payment';
import { TermPackage } from './term-package';
import { Summary } from './sumary';

export const Payment = () => {
    // State để lưu trữ thông tin đã chọn từ MethodPayment và TermPackage
    const [selectedMethod, setSelectedMethod] = useState<{
        nameTK: string;
        cardNumber: string;
        expirationDate: string;
        cvv: string;
    } | null>(null);
    const [selectedTerm, setSelectedTerm] = useState<{
        value: string;
        price: string;
    } | null>(null);
    return (
        <>
            <HeaderPay />
            <div className="container">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedMethod={setSelectedMethod} />
                </div>
                <Summary
                    selectedMethod={selectedMethod}
                    selectedTerm={selectedTerm}
                />
            </div>
        </>
    );
};
