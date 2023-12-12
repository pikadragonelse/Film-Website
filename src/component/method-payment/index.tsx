import React, { useState } from 'react';
import './index.scss';
import { Paypal } from '../../asset/icon/paypal';
import { MoMo } from '../../asset/icon/momo';
import { Radio, Space } from 'antd';

interface PaymentMethod {
    icon: React.ReactNode;
    label: string;
    value: number;
}

interface MethodPaymentProps {
    setSelectedLabel: (props?: any) => void;
}

const methods: PaymentMethod[] = [
    {
        icon: <Paypal />,
        label: 'Paypal',
        value: 1,
    },
    {
        icon: <MoMo />,
        label: 'VNPay',
        value: 2,
    },
];

export const MethodPayment: React.FC<MethodPaymentProps> = ({ setSelectedLabel }) => {
    const [label, setValue] = useState(1);

    const onChange = (e: any) => {
        const selectedLabel = e.target.value;
        setValue(selectedLabel);
        setSelectedLabel(selectedLabel);
    };

    return (
        <div className="wrapper-method">
            <div className="title-method">Chọn phương thức thanh toán</div>
            <div className="container-method">
                <Radio.Group onChange={onChange} value={label}>
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
