import React, { useState, ChangeEvent } from 'react';
import './index.scss';
import { Paypal } from '../../../asset/icon/paypal';
import { Input } from 'antd';

interface PaymentMethod {
    nameTK: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
}

interface MethodPaymentProps {
    setSelectedMethod: (method: PaymentMethod) => void;
}

export const MethodPayment: React.FC<MethodPaymentProps> = ({
    setSelectedMethod,
}) => {
    const [nameTK, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [method, setMethod] = useState<PaymentMethod>({
        nameTK: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedMethod = { ...method };

        if (name === 'nameTK') {
            const uppercaseValue: string = value.toUpperCase();
            updatedMethod.nameTK = uppercaseValue;
            setName(uppercaseValue);
        } else if (name === 'cardNumber') {
            let { value } = e.target;
            value = value.replace(/\D/g, '');
            updatedMethod.cardNumber = value;
            setCardNumber(value);
        } else if (name === 'expirationDate') {
            updatedMethod.expirationDate = value;
            setExpirationDate(value);
        } else if (name === 'cvv') {
            let { value } = e.target;
            value = value.replace(/\D/g, '');
            updatedMethod.cvv = value;
            setCvv(value);
        }

        setMethod(updatedMethod);
        setSelectedMethod(updatedMethod);
    };

    return (
        <div className="wrapper-method">
            <div className="title-method">Chọn phương thức thanh toán:</div>
            <div className="container-method">
                <>
                    <Paypal />
                    <div className="name">
                        <Input
                            name="nameTK"
                            placeholder="NGUYEN NHAT HA"
                            value={nameTK}
                            onChange={handleInputChange}
                        />
                        <Input
                            style={{
                                width: '100%',
                                fontSize: 'var(--font-s-lg)',
                                fontWeight: 500,
                            }}
                            maxLength={16}
                            name="cardNumber"
                            placeholder="123456789098754"
                            value={cardNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="day-cvv">
                        <div className="expiration-day">
                            <p>Expiration Date</p>
                            <Input
                                name="expirationDate"
                                placeholder="12/23"
                                value={expirationDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="cvv">
                            <p>CVV</p>
                            <Input
                                name="cvv"
                                placeholder="112"
                                maxLength={3}
                                value={cvv}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </>
                <div>
                    <img src="./" />
                </div>
            </div>
        </div>
    );
};
