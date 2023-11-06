import { Carousel, Row } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EpisodeItem } from '../episode-item';
import { CarouselRef } from 'antd/es/carousel';
import { ListEpisodesType } from '../index';
import './index.scss';

export const EspList = ({ listEpisodes }: ListEpisodesType) => {
    const { episodeId } = useParams();
    const moment = require('moment');
    const listRef = useRef<CarouselRef>(null);
    return (
        <div className="list">
            <Carousel className="list-content" dots={false} ref={listRef}>
                <div>
                    {listEpisodes.map((value) => (
                        <Row justify="center">
                            <Link to={`/movie/${value.movie_id}/${value.episode_id}`}>
                                <div className="item">
                                    <img src={value.posterUrl} alt="" className="poster-item" />
                                    <div
                                        className={`item ${
                                            episodeId !== undefined &&
                                            value.episode_id !== undefined &&
                                            value.episode_id === parseInt(episodeId)
                                                ? 'current-item'
                                                : ''
                                        }`}
                                    >
                                        <span>{value.title}</span>
                                        {/* <div> {moment(value.release_date).format('YYYY')}</div> */}
                                        <span>{value.duration} phút</span>
                                        {/* {value.num_view} */}
                                    </div>
                                </div>
                            </Link>
                        </Row>
                    ))}
                </div>
            </Carousel>
        </div>
    );
};
