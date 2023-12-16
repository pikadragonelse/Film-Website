import { CaretRightOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
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
};

export const FilmItem = ({ title, releaseDate, genres, posterURL, episodeNum }: FilmItem) => {
    return (
        <Badge.Ribbon text="Hot" color="red">
            <div className="film-item-container">
                <img src={posterURL} alt="" className="film-item-image" />
                <div className="btn-play">
                    <CaretRightOutlined />
                </div>
            </div>
            <h1 className="film-item-title max-w-[204px]">{title}</h1>
        </Badge.Ribbon>
    );
};
