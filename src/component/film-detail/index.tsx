// FilmDetail.tsx
import {
    HeartOutlined,
    ShareAltOutlined,
    SmallDashOutlined,
    StepForwardOutlined,
} from '@ant-design/icons';
import { Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { resizeImage } from '../../shared/utils';
import { FilmDetailTab } from './film-detail-tab';
import './index.scss';

export const FilmDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [filmDetail, setFilmDetail] = useState<any>(null);

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
        )
            .then((res) => res.json())
            .then((data) => setFilmDetail(data));
    }, [id]);

    if (!filmDetail) {
        return <div>Loading...</div>;
    }
    return (
        <div className="film-detail flex-grow mb-[200px]">
            <div
                style={{
                    backgroundImage: `url(${resizeImage(filmDetail.backdrop_path)})`,
                }}
                className="bg-center bg-no-repeat md:h-[400px] h-[300px] relative"
            >
                <div className="bg-gradient-to-br from-transparent to-black/90 h-full ">
                    <div className="flex flex-col md:flex-row bottom-[-85%] md:bottom-[20%] items-start tw-absolute-center-horizontal   ">
                        <div className="film-detail__name flex gap-10 items-center">
                            <img
                                className="film-detail__poster"
                                src={`https://image.tmdb.org/t/p/original${
                                    filmDetail && filmDetail.poster_path
                                }`}
                                alt="poster"
                            />
                            <div className="film-detail__title">{filmDetail.title}</div>
                        </div>

                        {/* Info */}
                        <div className="film-detail__header mb-6">
                            <div className="film-detail__info">
                                <div className="film-detal__summary">
                                    <span className="px-4 py-2 border rounded-full mr-4 film-detal__value">
                                        Hài hước
                                    </span>
                                    <span className="px-4 py-2 border rounded-full mr-4 film-detal__value">
                                        Lãng mạng
                                    </span>
                                    <span className="px-4 py-2 border rounded-full film-detal__value">
                                        Hàn Quốc
                                    </span>
                                </div>
                            </div>
                            <Link
                                to="/watching"
                                className="film-detail__watch flex items-center pl-6 pr-10 py-3 rounded-full text-whitetransition duration-300 mt-[-10px] mr-10"
                            >
                                <StepForwardOutlined />
                                <span className="ml-4 text-lg" style={{ fontSize: '1rem' }}>
                                    WATCH
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="flex gap-3 absolute top-[18%] right-[8%]">
                        <a className="h-10 w-10 rounded-full border-[2px] border-gray-400 ">
                            <HeartOutlined className="film-detail__icon" />
                        </a>

                        <a className="h-10 w-10 rounded-full border-[2px] border-gray-400 ">
                            <ShareAltOutlined className="film-detail__icon" />
                        </a>

                        <a className="h-10 w-10 rounded-full border-[2px] border-gray-400 ">
                            <SmallDashOutlined className="film-detail__icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='class="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0 px-64'>
                <div className="shrink-0 md:max-w-[150px] flex items-center md:flex-col justify-center flex-row gap-20 mt-28  md:border-r border-gray-600 pt-2 ml-[-200px]">
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-white font-medium text-lg">RATING</p>
                        <div>
                            <Progress
                                type="circle"
                                size={68}
                                percent={filmDetail.vote_average * 10}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-white font-medium text-lg">VOTE COUNT</p>
                        <div>
                            <p> {filmDetail.vote_count}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-grow min-h-[500px] px-20 mt-[-50px] detail-tabs">
                    <FilmDetailTab />
                </div>
            </div>
        </div>
    );
};
