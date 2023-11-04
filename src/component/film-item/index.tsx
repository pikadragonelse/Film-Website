import { CaretRightOutlined, CloseOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import { Badge } from 'antd';
import './index.scss';
import { CloseOutlined } from '@ant-design/icons';
import { Film, Genres, Actors, Episodes } from '../../model/film';


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
    onCancelClick?: () => void;
};

export const FilmItem = ({
    title,
    releaseDate,
    genres,
    posterURL,
    episodeNum,
    onCancelClick,
}: FilmItem) => {
    return (
        <Badge.Ribbon text="Hot" color="red">
            <div className="film-item-container">
                <div className="film-item-info">
                    <h1 className="film-item-title ">{name}</h1>
                    <p className="film-item-sub-info">{yearOfManufacture}</p>

                </div>
                <img src={poster} alt="" className="film-item-image" />
                <div className="btn-play">
                    <CaretRightOutlined />
                </div>

                {onCancelClick ? (
                    <div className="btn-close" onClick={onCancelClick}>
                        <CloseOutlined />
                    </div>
                ) : undefined}
            </div>
            {/* <h1 className="film-item-title ">{name}</h1> */}
        </Badge.Ribbon>
    );
};
