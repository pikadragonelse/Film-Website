import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import { FilmDetailCast } from '../film-detail-cast';
import { FilmDetailDirector } from '../film-detail-director';
import FilmDetailEpisodes from '../film-detail-episodes';
import FilmDetailReview from '../film-detail-review';
import { FilmDetailOverall } from './../film-detail-overall/index';
import './index.scss';
import { FilmDetailRelate } from '../film-relate';

interface FilmDetailTabProps {
    filmDetail: any;
}

export const FilmDetailTab: React.FC<FilmDetailTabProps> = ({ filmDetail }) => {
    const [activeTab, setActiveTab] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveTab(key);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case '1':
                return <FilmDetailOverall filmDetail={filmDetail} />;
            case '2':
                return <FilmDetailDirector filmDetail={filmDetail} />;

            case '3':
                return <FilmDetailCast filmDetail={filmDetail} />;

            case '4':
                return <FilmDetailEpisodes filmDetail={filmDetail} />;

            case '5':
                return <FilmDetailReview />;

            case '6':
                return <FilmDetailRelate />;
            default:
                return null;
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tổng thể',
        },
        {
            key: '2',
            label: 'Đạo diễn',
        },
        {
            key: '3',
            label: 'Diễn viên',
        },
        {
            key: '4',
            label: 'Tập',
        },
        {
            key: '5',
            label: 'Đánh giá',
        },
        {
            key: '6',
            label: 'Phim liên quan',
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
