import React, { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import { VIPPackageRaw } from '../../model/VIP-package';
import { setIdSelectedInfoPackage, setNamePackage } from '../../redux/VIPPaymentSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { SubscriptionType } from '../../page/vip-package';

export interface DataTable {
    title: string;
    package1: string;
    package2: string;
    id: string;
}
export interface DataVIPLabel {
    title: string;
    value: string;
}

export type subInfo = {
    qualityVideo: string;
    resolution: string;
};

export type ListVipPackage = {
    className?: string;
    dataVIPPackage?: SubscriptionType[];
};
export const ListVipPackage = ({ className, dataVIPPackage = [] }: ListVipPackage) => {
    const [selectedPackage, setSelectedPackage] = useState(2);
    const dispatch = useAppDispatch();
    const [dataRender, setDataRender] = useState<
        {
            label: string;
            value1: string | number;
            value2: string | number;
        }[]
    >([]);

    useEffect(() => {
        if (dataVIPPackage.length !== 0) {
            setDataRender([
                {
                    label: 'Giá hàng tháng',
                    value1: `${dataVIPPackage[0].price.toLocaleString('it-IT')} ₫`,
                    value2: `${dataVIPPackage[1].price.toLocaleString('it-IT')} ₫`,
                },
                {
                    label: 'Chất lượng video',
                    value1: 'Tốt',
                    value2: 'Tốt nhất',
                },
                {
                    label: 'Độ phân giải',
                    value1: '1080p',
                    value2: '4k+HDR',
                },
            ]);
            setSelectedPackage(dataVIPPackage[0].subscriptionTypeId);
            dispatch(setIdSelectedInfoPackage(dataVIPPackage[0].subscriptionTypeId));
            dispatch(setNamePackage(dataVIPPackage[0].name));
        }
    }, [dataVIPPackage]);

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
                                dispatch(setNamePackage(value.name));
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
            {dataRender.map((value) => (
                <tr className="list-vip-package-row">
                    <td className="list-vip-package-cell list-vip-package-title ">{value.label}</td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 2 ? 'highlight' : ''
                        }`}
                    >
                        {value.value1}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 3 ? 'highlight' : ''
                        }`}
                    >
                        {value.value2}
                    </td>
                </tr>
            ))}
        </table>
    );
};
