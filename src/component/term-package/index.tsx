import React, { useEffect, useState } from 'react';
import './index.scss';
import { Radio, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { DurationVIP } from '../../model/duration-VIP';
import axios from 'axios';
import { dataVIPPackageRaw } from '../../page/vip-package';
import {
    setDurationValue,
    setIdSelectedInfoDuration,
    setTotalPrice,
} from '../../redux/VIPPaymentSlice';
import { useParams } from 'react-router-dom';

export interface TermPackage {
    value: number;
    price: number;
}
interface TermPackageProps {
    setSelectedTerm: (term: TermPackage) => void;
}

export const TermPackage: React.FC<TermPackageProps> = ({ setSelectedTerm }) => {
    const idPackage: number = Number(useParams().idPackage);
    // const idPackage = useAppSelector((state) => state.VIPPayment.subscriptionTypeId);

    const [terms, setTerms] = useState<DurationVIP[]>([]);
    const getDataDuration = () => {
        axios
            .get(
                'http://movies.southeastasia.cloudapp.azure.com:8000/api/subscription/get-all-subscription-info',
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            .then((response) => {
                const listData: dataVIPPackageRaw[] = response.data.data;
                const dataTemp: DurationVIP[] = listData.map((value) => {
                    console.log(value.subscriptionType.subscriptionTypeId, idPackage);

                    return value.subscriptionType.subscriptionTypeId === idPackage
                        ? {
                              durationId: value.duration.durationId,
                              time: value.duration.time,
                              price: value.subscriptionType.price,
                          }
                        : { durationId: 0, time: 0, price: 0 };
                });
                setTerms(dataTemp);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getDataDuration();
    }, []);

    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();

    const onChange = (e: any) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        dispatch(setIdSelectedInfoDuration(selectedValue));
        // Thay đổi URL của trình duyệt
        window.history.pushState({ path: window.location.href }, '', selectedValue);
    };

    return (
        <div className="wrapper-term">
            <div className="title-term">Chọn thời hạn gói</div>
            <div className="container-term">
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {terms.map((term, index) =>
                            term.durationId !== 0 ? (
                                <Radio
                                    key={index}
                                    value={term.durationId}
                                    onClick={() => {
                                        dispatch(setDurationValue(term.time));
                                        dispatch(setTotalPrice(term.price));
                                    }}
                                >
                                    <Space>
                                        <div className="items">
                                            <div className="value-term">
                                                {term.time >= 10 ? '' : 0}
                                                {term.time}&nbsp;tháng
                                            </div>
                                            <div className="price-term">
                                                {term.price.toLocaleString('it-IT')}&nbsp;₫
                                            </div>
                                        </div>
                                    </Space>
                                </Radio>
                            ) : null,
                        )}
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
};
