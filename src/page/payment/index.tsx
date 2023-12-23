import React, { useEffect, useState } from 'react';
import './index.scss';
import { HeaderPay } from '../../component/header-pay';
import { MethodPayment } from '../../component/method-payment';
import { TermPackage } from '../../component/term-package';
import { Summary } from '../../component/sumary';
import { useAppSelector } from '../../redux/hook';
import axios from 'axios';
import { SubscriptionInfo } from '../../model/subscription-info';

export const Payment = () => {
    const [selectedTerm, setSelectedTerm] = useState<TermPackage | null>(null);
    const [selectedMethod, setSelectedMethod] = useState(1);
    const [dataSubscriptionInfo, setDataSubscriptionInfo] = useState<SubscriptionInfo[]>([]);
    const { subscriptionTypeId, durationValue } = useAppSelector((state) => state.VIPPayment);
    const [selectedPackageId, setSelectedPackageId] = useState(0);
    const [discount, setDiscount] = useState(1);

    const getDataSubscriptionInfo = () => {
        axios
            .get('http://localhost:8000/api/subscription/get-all-subscription-info')
            .then((response) => {
                setDataSubscriptionInfo(response.data.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getDataSubscriptionInfo();
    }, []);

    useEffect(() => {
        if (dataSubscriptionInfo.length !== 0) {
            dataSubscriptionInfo.forEach((subscription) => {
                if (
                    subscription.subscriptionType.subscriptionTypeId === subscriptionTypeId &&
                    subscription.duration.time === durationValue
                ) {
                    setSelectedPackageId(subscription.subscriptionInfoId);
                    setDiscount(subscription.discount);
                }
            });
        }
    }, [durationValue, subscriptionTypeId]);

    return (
        <>
            <HeaderPay currentStep={1} />
            <div className="container-payment">
                <div className="choose">
                    <TermPackage setSelectedTerm={setSelectedTerm} />
                    <MethodPayment setSelectedMethod={setSelectedMethod} />
                </div>
                <div className="summary">
                    <Summary
                        subscriptionInfoId={selectedPackageId}
                        selectedMethod={selectedMethod}
                        selectedTerm={selectedTerm}
                        discount={discount}
                    />
                </div>
            </div>
        </>
    );
};
