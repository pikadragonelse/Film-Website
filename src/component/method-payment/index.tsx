import React, { useEffect, useState } from 'react';
import './index.scss';
import { Paypal } from '../../asset/icon/paypal';
import { MoMo } from '../../asset/icon/momo';
import { Radio, Space } from 'antd';
import { VNPayLogo } from '../../asset/icon/VNPay-logo';
import { useAppDispatch } from '../../redux/hook';
import { setMethodPayment } from '../../redux/VIPPaymentSlice';

interface PaymentMethod {
    icon: React.ReactNode;
    label: string;
    value: number;
}

interface MethodPaymentProps {
    setSelectedMethod: (props?: any) => void;
}

const methods: PaymentMethod[] = [
    {
        icon: <Paypal />,
        label: 'Paypal',
        value: 1,
    },
    {
        icon: <VNPayLogo />,
        label: 'VNPay',
        value: 2,
    },
];

export const MethodPayment: React.FC<MethodPaymentProps> = ({ setSelectedMethod }) => {
    const [value, setValue] = useState(0);

    const dispatch = useAppDispatch();

    const onChange = (e: any) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        setSelectedMethod(selectedValue);
        dispatch(setMethodPayment(selectedValue));
    };

    useEffect(() => {
        dispatch(setMethodPayment(1));
        setSelectedMethod(1);
        setValue(1);
    }, []);

    return (
        <div className="wrapper-method">
            <div className="title-method">Chọn phương thức thanh toán</div>
            <div className="container-method">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {methods.map((method, index) => (
                            <Radio key={index} value={method.value}>
                                <Space>
                                    <div className="items">
                                        <div className="icon-method">{method.icon}</div>
                                        <div className="label-method">{method.label}</div>
                                    </div>
                                </Space>
                            </Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
};
