import React, { useState } from 'react';
import './index.scss';
import { Paypal } from '../../asset/icon/paypal';
import { MoMo } from '../../asset/icon/momo';
import { Radio, Space } from 'antd';

interface PaymentMethod {
    icon: React.ReactNode;
    label: string;
}

interface MethodPaymentProps {
    setSelectedLabel: (label: string) => void;
}

const methods: PaymentMethod[] = [
    {
        icon: <Paypal />,
        label: 'Paypal',
    },
    {
        icon: <MoMo />,
        label: 'Ví MoMo',
    },
];

export const MethodPayment: React.FC<MethodPaymentProps> = ({
    setSelectedLabel,
}) => {
    const [label, setLabel] = useState('Paypal');

    const onChange = (e: any) => {
        const selectedLabel = e.target.value;
        setLabel(selectedLabel);
        setSelectedLabel(selectedLabel);
    };

    return (
        <div className="wrapper-method">
            <div className="title-method">Chọn phương thức thanh toán:</div>
            <div className="container-method">
                <Radio.Group onChange={onChange} value={label}>
                    <Space direction="vertical">
                        {methods.map((method, index) => (
                            <Radio key={index} value={method.label}>
                                <Space>
                                    <div className="items">
                                        <div className="icon-method">
                                            {method.icon}
                                        </div>
                                        <div className="label-method">
                                            {method.label}
                                        </div>
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
