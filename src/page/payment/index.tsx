import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from '../../component/header-pay';
import { MethodPayment } from '../../component/method-payment';
import { TermPackage } from '../../component/term-package';
import { Summary } from '../../component/sumary';
import { useAppSelector } from '../../redux/hook';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<TermPackage | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string>('Paypal');
    const idVIPPackage = useAppSelector((state) => state.VIPPayment.subscriptionTypeId);

    return (
        <>
            <HeaderPay currentStep={1} />
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedLabel={setSelectedLabel} />
                </div>
                <div className="summary">
                    <Summary selectedLabel={selectedLabel} selectedTerm={selectedTerm} />
                </div>
            </div>
        </>
    );
};
