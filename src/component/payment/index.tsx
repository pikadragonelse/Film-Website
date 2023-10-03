import React, { useState } from 'react';
import './index.scss';
import { HeaderPay } from './header-pay';
import { MethodPayment } from './method-payment';
import { TermPackage } from './term-package';
import { Summary } from './sumary';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<{
        value: string;
        price: string;
    } | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    return (
        <>
            <HeaderPay />
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
