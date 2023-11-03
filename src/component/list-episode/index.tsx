import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { FilmItem } from '../film-item';
import Title from 'antd/es/typography/Title';
import './index.scss';
import { CarouselRef } from 'antd/es/carousel';
import { Episodes, Film } from '../../model/film';
import { Link } from 'react-router-dom';
import { EpisodeItem } from './episode-item';

export type ListEpisodes = {
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
    multiSessions = false,
}: ListEpisodes) => {
    const moment = require('moment');
    const listRef = useRef<CarouselRef>(null);
    const [page, setPage] = useState<number>(0);

    const handleLimited = (page: number) => {
        if (listEpisodes) {
            switch (page) {
                case 0:
                    return 'left';
                case listEpisodes.length - 1:
                    return 'right';
                default:
                    return '';
            }
        }
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
            <div
                className={`session-section ${
                    multiSessions === true ? 'show' : ''
                }`}
            >
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
            <div className="list">
                <div
                    className={`icon-list-container left-move-container ${
                        handleLimited(page) === 'left' ? 'hide' : ''
                    }`}
                    onClick={() => {
                        listRef.current?.prev();
                        setPage((prev) => prev - 1);
                    }}
                >
                    <LeftOutlined className="icon-list " />
                </div>
                {listEpisodes.length > 6 && (
                    <div
                        className={`icon-list-container right-move-container ${
                            handleLimited(page) === 'right' ? 'hide' : ''
                        }`}
                        onClick={() => {
                            listRef.current?.next();
                            setPage((prev) => prev + 1);
                        }}
                    >
                        <RightOutlined className="icon-list" />
                    </div>
                )}

                <Carousel className="list-content" dots={false} ref={listRef}>
                    <div>
                        <Row justify="center">
                            {listEpisodes.map((value) => (
                                <Col span={4} className="list-col">
                                    <Link
                                        to={`/watching/${value.movieId}/${value.episodeId}`}
                                    >
                                        <EpisodeItem
                                            episodeTitle={value.episodeTitle}
                                            releaseDate={moment(
                                                value.releaseDate,
                                            ).format('YYYY')}
                                            duration={value.duration}
                                            numView={value.numView}
                                            posterUrl={value.posterUrl}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};
