import { ControlOutlined, DashboardOutlined } from '@ant-design/icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './index.scss';

export type SettingItemData = {
    icon?: React.ReactNode;
    name?: string;
    currValue?: string;
    value?: string;
};

export type SettingItem = {
    items?: SettingItemData[];
    onSelected?: (value?: string) => void;
    className?: string;
};
export const SettingItem = ({ items, onSelected = () => {}, className }: SettingItem) => {
    return (
        <div className={`setting-item-container ${className}`}>
            {items?.map((value) => (
                <div
                    className=" flex items-center justify-between px-3 py-4 hover:bg-zinc-700/[.5] cursor-pointer"
                    onClick={() => onSelected(value.value)}
                >
                    <div className="setting-item flex gap-2 items-center text-slate-50">
                        {value.icon}
                        <h4 className="title inline-block font-medium ">{value.name}</h4>
                    </div>
                    <div className="flex gap-2 items-center text-slate-50">
                        <span className="content inline-block text-sm">{value.currValue}</span>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            ))}
        </div>
    );
};
