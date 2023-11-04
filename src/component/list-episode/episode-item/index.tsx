import './index.scss';
import { CloseOutlined } from '@ant-design/icons';

interface Episodes {
    episodeId?: number;
    movieId?: number;
    episodeTitle: string;
    releaseDate?: string;
    posterUrl?: string;
    movieUrl?: string;
    numView?: string;
    duration: number;
    episodeNo?: number;
    titleFilm?: string;
}
export const EpisodeItem = ({
    episodeTitle,
    releaseDate,
    numView,
    posterUrl,
    duration,
}: Episodes) => {
    return (
        <div className="film-item-container">
            <div className="film-item-info">
                <h1 className="film-item-title">{episodeTitle}</h1>
                <h5 className="film-item-duration">
                    {'•'} {duration} {' phút'}
                </h5>
                <p className="film-item-sub-info">
                    {/* {releaseDate}  */}
                    {numView}
                    {' lượt xem'}
                </p>
            </div>
            <img src={posterUrl} alt="" className="film-item-image" />
        </div>
    );
};
