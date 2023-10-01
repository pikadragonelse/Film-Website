import React, { useState } from 'react';
import './index.scss';
import { Radio, Space } from 'antd';

interface TermPackage {
    value: string;
    price: string;
}
interface TermPackageProps {
    setSelectedTerm: (term: { value: string; price: string }) => void;
}

export const TermPackage: React.FC<TermPackageProps> = ({
    setSelectedTerm,
}) => {
    const terms: TermPackage[] = [
        {
            value: '1 tháng',
            price: '69000 ₫',
        },
        {
            value: '3 tháng',
            price: '79000 ₫',
        },
        {
            value: '6 tháng',
            price: '99000 ₫',
        },
        {
            value: '12 tháng',
            price: '100000 ₫',
        },
    ];
    const [value, setValue] = useState('1 tháng');

    const onChange = (e: any) => {
        const selectedValue = e.target.value;
        const selectedTerm = terms.find((term) => term.value === selectedValue);
        if (selectedTerm) {
            setValue(selectedValue);
            setSelectedTerm(selectedTerm);
        }
    };

    return (
        <div className="wrapper-term">
            <div className="title-term">Chọn thời hạn:</div>
            <div className="container-term">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {terms.map((term, index) => (
                            <Radio key={index} value={term.value}>
                                <Space>
                                    <div className="items">
                                        <div className="value-term">
                                            {term.value}
                                        </div>
                                        <div className="price-term">
                                            {term.price}
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
