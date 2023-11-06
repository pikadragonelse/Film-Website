import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Title from 'antd/es/typography/Title';
import './index.scss';
import { CarouselRef } from 'antd/es/carousel';
import { Episodes, Film } from '../../model/film';
import { Link } from 'react-router-dom';
import { EpisodeItem } from './episode-item';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { EspList } from './esp-list';
import { EspKanban } from './esp-kanban';

export type ListEpisodesType = {
    title?: string;
    titleFilm?: string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    multiSessions?: boolean;
    listEpisodes: Array<Episodes>;
};
export const ListEpisodes = ({
    title,
    titleFilm,
    subInfo,
    sessions = [],
    listEpisodes,
    multiSessions = true,
}: ListEpisodesType) => {
    const [isListVisible, setIsListVisible] = useState(true);

    const toggleView = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div className="list-container-watching">
            <div className="list-heading">
                <Title level={2} className="list-title">
                    {title}
                </Title>
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
            </div>
            <div className="session-view">
                <div className={`session-section ${multiSessions ? 'show' : ''}`}>
                    <Dropdown
                        menu={{ items: sessions }}
                        trigger={['click']}
                        className="session-section-select"
                    >
                        <Button className="session-btn-select">
                            Mùa 1
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className="session-segment">
                    <div className="segment-icon">
                        {isListVisible ? (
                            <AppstoreOutlined onClick={toggleView} />
                        ) : (
                            <BarsOutlined onClick={toggleView} />
                        )}
                    </div>
                    <div className="segment-content">
                        {isListVisible ? (
                            <EspList listEpisodes={listEpisodes} />
                        ) : (
                            <EspKanban listEpisodes={listEpisodes} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
