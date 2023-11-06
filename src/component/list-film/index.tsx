import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import { CarouselRef } from 'antd/es/carousel';

import Title from 'antd/es/typography/Title';
import { useRef, useState } from 'react';
import { Film } from '../../model/film';

import { Link } from 'react-router-dom';
import { FilmItem } from '../film-item';
import './index.scss';

export type ListFilm = {
    title?: string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    listFilm: Array<Film>;
    multiSessions?: boolean;
};
export const ListFilm = ({
    title,
    subInfo,
    sessions = [],
    listFilm,
    multiSessions = false,
}: ListFilm) => {
    const moment = require('moment');
    const listRef = useRef<CarouselRef>(null);
    const [page, setPage] = useState<number>(0);
    const [currentItemCount, setCurrentItemCount] = useState(0);
    const showNext6Items = () => {
        setCurrentItemCount((prev) => prev + 6);
    };
    const showPrev6Items = () => {
        setCurrentItemCount((prev) => prev - 6);
    };
    const handleLimited = (page: number) => {
        if (listFilm) {
            switch (page) {
                case 0:
                    return 'left';
                case listFilm.length - 1:
                    return 'right';
                default:
                    return '';
            }
        }
    };

    return (
        <div className="list-container">
            <div className="list-heading">
                <Title level={2} className="list-title ml-20 z-50">
                    {title}
                </Title>
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
            </div>
            <div className={`session-section ${multiSessions === true ? 'show' : ''}`}>
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
            <div className="list mb-16">
                <div
                    className={`icon-list-container left-move-container ${
                        handleLimited(page) === 'left' ? 'hide' : ''
                    }`}
                    onClick={() => {
                        listRef.current?.prev();
                        setPage((prev) => prev - 1);
                        showPrev6Items();
                    }}
                >
                    <LeftOutlined className="icon-list " />
                </div>
                {listFilm.length > 6 && (
                    <div
                        className={`icon-list-container right-move-container ${
                            handleLimited(page) === 'right' ? 'hide' : ''
                        }`}
                        onClick={() => {
                            listRef.current?.next();
                            setPage((prev) => prev + 1);
                            showNext6Items();
                        }}
                    >
                        <RightOutlined className="icon-list" />
                    </div>
                )}
                <Carousel className="list-content" dots={false} ref={listRef}>
                    <div>
                        <Row justify="center">
                            {listFilm.slice(currentItemCount, currentItemCount + 6).map((value) => (
                                <Col span={4} className="list-col">
                                    <Link to={`/movie/${value.movieId}`}>
                                        <FilmItem
                                            title={value.title}
                                            releaseDate={moment(value.releaseDate).format(
                                                'YYYY-MM-DD',
                                            )}
                                            episodeNum={value.episodeNum}
                                            genres={value.genres.map((genre: any) => genre.name)}
                                            posterURL={value.posterURL}
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
