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
        <div className="film-item-container">
            <div className="film-item-info">
                <h1 className="film-item-title">{title}</h1>
                <p className="film-item-sub-info">
                    {releaseDate} {'•'} {episodeNum}
                    {' tập'}
                </p>
            </div>
            <img src={posterURL} alt="" className="film-item-image" />
            {onCancelClick ? (
                <div className="btn-close" onClick={onCancelClick}>
                    <CloseOutlined />
                </div>
            ) : undefined}
        </div>
    );
};
