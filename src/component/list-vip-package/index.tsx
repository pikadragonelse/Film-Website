import React, { useState } from 'react';
import './index.scss';

export interface DataTable {
    title: string;
    package1: string;
    package2: string;
    package3: string;
}

export interface DataVIPLabel {
    title: string;
    value: string;
}

export const dataMapDefault: DataTable[] = [
    {
        title: 'Giá hàng tháng',
        package1: '70.000 ₫',
        package2: '108.000 ₫',
        package3: '220.000 ₫',
    },
    {
        title: 'Chất lượng video',
        package1: 'Tốt',
        package2: 'Tốt hơn',
        package3: 'Tốt nhất',
    },
    {
        title: 'Độ phân giải',
        package1: '720p',
        package2: '1080p',
        package3: '4K+HDR',
    },
];

export const dataLabelDefault: DataVIPLabel[] = [
    {
        title: 'Cơ bản',
        value: 'normal',
    },
    {
        title: 'Tiêu chuẩn',
        value: 'standard',
    },
    {
        title: 'Cao cấp',
        value: 'premium',
    },
];

export type ListVipPackage = {
    className?: string;
    dataMap?: DataTable[];
    dataLabel?: DataVIPLabel[];
};
export const ListVipPackage = ({
    className,
    dataMap = dataMapDefault,
    dataLabel = dataLabelDefault,
}: ListVipPackage) => {
    const [selectedPackage, setSelectedPackage] = useState('normal');

    return (
        <table className={`list-vip-package-table ${className}`}>
            <tr className="list-vip-package-radio">
                <td></td>
                {dataLabel.map((value) => (
                    <td className="list-vip-package-radio-cell">
                        <label
                            htmlFor={value.value}
                            className={`list-vip-package-label ${
                                selectedPackage === value.value
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() => setSelectedPackage(value.value)}
                        >
                            {value.title}
                        </label>
                        <input
                            type="radio"
                            name="vip"
                            id={value.value}
                            value={value.value}
                            hidden
                        />
                    </td>
                ))}
            </tr>
            {dataMap.map((value) => (
                <tr className="list-vip-package-row">
                    <td className="list-vip-package-cell list-vip-package-title ">
                        {value.title}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 'normal' ? 'highlight' : ''
                        }`}
                    >
                        {value.package1}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 'standard' ? 'highlight' : ''
                        }`}
                    >
                        {value.package2}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 'premium' ? 'highlight' : ''
                        }`}
                    >
                        {value.package3}
                    </td>
                </tr>
            ))}
        </table>
    );
};
