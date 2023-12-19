import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from '../../component/header-pay';
import { MethodPayment } from '../../component/method-payment';
import { TermPackage } from '../../component/term-package';
import { Summary } from '../../component/sumary';
import { useAppSelector } from '../../redux/hook';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<TermPackage | null>(null);
    const [selectedMethod, setSelectedMethod] = useState(1);

    return (
        <>
            <HeaderPay currentStep={1} />
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedLabel={setSelectedMethod} />
                </div>
                <div className="summary">
                    <Summary selectedMethod={selectedMethod} selectedTerm={selectedTerm} />
                </div>
            </div>
        </>
    );
};
