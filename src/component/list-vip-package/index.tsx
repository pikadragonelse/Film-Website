import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { VIPPackageRaw } from '../../model/VIP-package';
import { setIdSelectedInfoPackage } from '../../redux/VIPPaymentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

export interface DataTable {
    title: string;
    package1: string;
    package2: string;
}

export interface DataVIPLabel {
    title: string;
    value: string;
}

export type ListVipPackage = {
    className?: string;
    dataMap?: DataTable[];
    dataLabel?: DataVIPLabel[];
};
export const ListVipPackage = ({ className }: ListVipPackage) => {
    const [selectedPackage, setSelectedPackage] = useState(2);
    const [dataVIPPackage, setDataVIPPackage] = useState<VIPPackageRaw[]>([]);
    const [dataMap, setDataMap] = useState<DataTable[]>([]);
    const dispatch = useAppDispatch();

    const getVipPackage = () => {
        axios
            .get('http://localhost:8000/api/subscription/get-all-subscription-type', {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                setDataVIPPackage([response.data.data[1], response.data.data[2]]);
                setDataMap([
                    {
                        title: 'Giá hàng tháng',
                        package1: `${response.data.data[1].price} ₫`,
                        package2: `${response.data.data[2].price} ₫`,
                    },
                    {
                        title: 'Chất lượng video',
                        package1: 'Tốt',
                        package2: 'Tốt nhất',
                    },
                    {
                        title: 'Độ phân giải',
                        package1: '1080p',
                        package2: '4K+HDR',
                    },
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getVipPackage();
    }, []);

    return (
        <table className={`list-vip-package-table ${className}`}>
            <tr className="list-vip-package-radio">
                <td></td>
                {dataVIPPackage.map((value) => (
                    <td className="list-vip-package-radio-cell">
                        <label
                            htmlFor={value.subscriptionTypeId.toString()}
                            className={`list-vip-package-label ${
                                selectedPackage === value.subscriptionTypeId ? 'selected' : ''
                            }`}
                            onClick={() => {
                                setSelectedPackage(value.subscriptionTypeId);
                                dispatch(setIdSelectedInfoPackage(value.subscriptionTypeId));
                            }}
                        >
                            {value.name}
                        </label>
                        <input
                            type="radio"
                            name="vip"
                            id={value.subscriptionTypeId.toString()}
                            value={value.subscriptionTypeId}
                            hidden
                        />
                    </td>
                ))}
            </tr>
            {dataMap.map((value) => (
                <tr className="list-vip-package-row">
                    <td className="list-vip-package-cell list-vip-package-title ">{value.title}</td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 2 ? 'highlight' : ''
                        }`}
                    >
                        {value.package1}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 3 ? 'highlight' : ''
                        }`}
                    >
                        {value.package2}
                    </td>
                </tr>
            ))}
        </table>
    );
};
