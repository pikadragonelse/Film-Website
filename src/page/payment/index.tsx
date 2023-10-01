import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from './header-pay';
import { MethodPayment } from './method-payment';
import { TermPackage } from './term-package';
import { Summary } from './sumary';

export const Payment = () => {
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
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedMethod={setSelectedMethod} />
                </div>
                <div className="summary">
                    <Summary
                        selectedMethod={selectedMethod}
                        selectedTerm={selectedTerm}
                    />
                </div>
            </div>
        </>
    );
};
