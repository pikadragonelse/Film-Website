import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from '../../component/header-pay';
import { MethodPayment } from '../../component/method-payment';
import { TermPackage } from '../../component/term-package';
import { Summary } from '../../component/sumary';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<{
        value: string;
        price: string;
    } | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    return (
        <>
            <HeaderPay currentStep={1} />
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedLabel={setSelectedLabel} />
                </div>
                <div className="summary">
                    <Summary
                        selectedLabel={selectedLabel}
                        selectedTerm={selectedTerm}
                    />
                </div>
            </div>
        </>
    );
};
