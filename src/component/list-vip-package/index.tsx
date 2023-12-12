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

const infoMap: Record<number, subInfo> = {
    2: {
        qualityVideo: 'Tốt',
        resolution: '1080p',
    },
    3: {
        qualityVideo: 'Tốt nhất',
        resolution: '4k (HDR)',
    },
};

export type ListVipPackage = {
    className?: string;
    dataMap?: DataTable[];
    dataLabel?: DataVIPLabel[];
    dataVIPPackage?: SubscriptionType[];
};
export const ListVipPackage = ({ className, dataVIPPackage = [] }: ListVipPackage) => {
    const [selectedPackage, setSelectedPackage] = useState(1);
    const dispatch = useAppDispatch();

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
            {dataVIPPackage.map((value) => (
                <tr className="list-vip-package-row">
                    <td className="list-vip-package-cell list-vip-package-title ">{value.name}</td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 2 ? 'highlight' : ''
                        }`}
                    >
                        {infoMap[value.subscriptionTypeId] != null
                            ? infoMap[value.subscriptionTypeId].qualityVideo
                            : ''}
                    </td>
                    <td
                        className={`list-vip-package-cell ${
                            selectedPackage === 3 ? 'highlight' : ''
                        }`}
                    >
                        {infoMap[value.subscriptionTypeId] != null
                            ? infoMap[value.subscriptionTypeId].resolution
                            : ''}
                    </td>
                </tr>
            ))}
        </table>
    );
};
