// BillItem.tsx
import React from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';
import './index.scss';

interface BillItemProps {
    title: string;
    content: string;
}

export const BillItem: React.FC<BillItemProps> = ({ title, content }) => {
    return (
        <li className="bill-item pb-4 sm:pb-8">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <CheckCircleTwoTone
                        className="w-8 h-8 rounded-full"
                        twoToneColor="#52c41a"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                        {title}
                    </p>
                </div>
                <div
                    style={{ marginLeft: '140px' }}
                    className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                    {content}
                </div>
            </div>
        </li>
    );
};
