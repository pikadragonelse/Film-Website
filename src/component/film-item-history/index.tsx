import { CaretRightOutlined } from '@ant-design/icons';
import { Badge, Skeleton } from 'antd';
import { useState } from 'react';
import { Actors, Episodes } from '../../model/film';
import './index.scss';

export type FilmItem = {
    movieId?: number;
    title?: string;
    description?: string;
    releaseDate?: string;
    nation?: string;
    posterURL?: string;
    trailerURL?: string;
    averageRating?: string;
    episodeNum?: number;
    level?: number;
    genres?: Array<string>;
    actors?: Array<Actors>;
    episodes?: Array<Episodes>;
    data?: any;
    id?: number;
    backgroundURL?: string;
    backgroundMovieURL?: string;
    posterMovieURL?: string;
};

export const FilmItemHistory = ({ title, posterMovieURL }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <Badge.Ribbon text="Hot" color="red" className={`${isLoadingImg === true ? 'hidden' : ''}`}>
            <div className="film-item-container relative">
                <Skeleton.Image
                    active
                    className={`absolute z-10 h-full w-full ${
                        isLoadingImg === false ? 'hidden' : ''
                    }`}
                />
                <img
                    src={posterMovieURL}
                    alt=""
                    className="film-item-image"
                    onLoad={() => setIsLoadingImg(false)}
                />
                <div className="btn-play z-10">
                    <CaretRightOutlined className="text-white" />
                </div>
            </div>
            <h1 className="film-item-title max-w-[204px]">{title}</h1>
        </Badge.Ribbon>
    );
};