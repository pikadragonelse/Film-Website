import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.scss';

import { FilmDetailOverall } from '../film-detail-overall';
import { FilmDetailCast } from '../film-detail-cast';

export const FilmDetailTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveTab(key);
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case '1':
                return <FilmDetailCast />
            case '2':
                return <FilmDetailCast />;
            case '3':
                return <FilmDetailCast />;
            default:
                return null;
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tổng thể',
            children: '',
        },
        {
            key: '2',
            label: 'Diễn viên',
            children: '',
        },
        {
            key: '3',
            label: 'Tập',
            children: '',
        },


    ];
    return (
        <div>
            <Tabs
                className="hover:text-white transition duration-300 pb-1 false"
                style={{ color: 'white' }}
                defaultActiveKey="1"
                items={items}
                activeKey={activeTab}
                onChange={onChange}
            />
            {renderTabContent()}
        </div>
    );
};
