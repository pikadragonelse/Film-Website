import React, { useState } from 'react';
import './index.scss';
import { Radio, Space } from 'antd';

export interface TermPackage {
    value: number;
    price: number;
}
interface TermPackageProps {
    setSelectedTerm: (term: TermPackage) => void;
}

export const TermPackage: React.FC<TermPackageProps> = ({ setSelectedTerm }) => {
    const terms: TermPackage[] = [
        {
            value: 1,
            price: 69000,
        },
        {
            value: 6,
            price: 99000,
        },
        {
            value: 12,
            price: 100000,
        },
    ];
    const [value, setValue] = useState(0);

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
            <div className="title-term">Chọn thời hạn gói</div>
            <div className="container-term">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {terms.map((term, index) => (
                            <Radio key={index} value={term.value}>
                                <Space>
                                    <div className="items">
                                        <div className="value-term">0{term.value}&nbsp;tháng</div>
                                        <div className="price-term">
                                            {term.price.toLocaleString('it-IT')}&nbsp;₫
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
