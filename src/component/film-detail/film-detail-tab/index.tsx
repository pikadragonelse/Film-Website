import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

import { FilmDetailCast } from '../film-detail-cast';
import FilmDetailReview from '../film-detail-review';

import FilmDetailOverall from './../film-detail-overall/index';
import FilmDetailEpisodes from '../film-detail-episodes';
import { FilmDetailDirector } from '../film-detail-director';
import { Comment } from '../../comment';
import { CurrentUser } from '../../../component/comment';


const currentUser: CurrentUser = {
    username: 'user1',
    email: 'user1@gmail.com',
    avatar: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
};
export const FilmDetailTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('1');

    const onChange = (key: string) => {
        setActiveTab(key);
    };
    const isLogin = useSelector((state: RootState) => state.user.isLogin);
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

                // return <FilmDetailReview />;
                return (
                    <Comment
                        title="Comments"
                        isLogin={isLogin}
                        currentUser={currentUser}
                        placeholder="Write a comment..."
                    />
                );

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
