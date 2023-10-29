import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import './index.scss';

import { FilmDetailCast } from '../film-detail-cast';
import FilmDetailReview from '../film-detail-review';

import FilmDetailEpisodes from '../film-detail-episodes';
import FilmDetailOverall from './../film-detail-overall/index';

import { FilmDetailDirector } from '../film-detail-director';

export const FilmDetailTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case '1':
                return <FilmDetailOverall />;
            case '2':
                return <FilmDetailDirector />;
            case '3':
                return <FilmDetailCast />;
            case '4':
                return <FilmDetailEpisodes />;
            case '5':
                return <FilmDetailReview />;

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
            label: 'Đạo diễn',
            children: '',
        },
        {
            key: '3',
            label: 'Diễn viên',
            children: '',
        },
        {
            key: '4',
            label: 'Tập',
            children: '',
        },
        {
            key: '5',
            label: 'Đánh giá',
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
