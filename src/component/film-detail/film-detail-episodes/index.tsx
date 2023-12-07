import { Badge } from 'antd';
import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Episodes } from '../../../model/film';
import { CaretRightOutlined } from '@ant-design/icons';

interface FilmDetail {
    episodes: Episodes[];
}

interface FilmDetailEpisodesProps {
    filmDetail: FilmDetail;
}

const FilmDetailEpisodes: React.FC<FilmDetailEpisodesProps> = ({ filmDetail }) => {
    const { episodes } = filmDetail;
    return (
        <>
            <p className="episodes-length">Tổng số tập : {episodes.length}</p>

            <div className="grid grid-cols-5 gap-x-20 gap-y-[5.1rem] mt-8 episode-item">
                {episodes.map((episode) => (
                    <Badge.Ribbon text={episode.title} color="red">
                        <Link
                            to={`/movie/${episode.movie_id}/${episode.episode_id}`}
                            className="episode-link"
                        >
                            <img
                                className="object-cover h-[100%] w-[100%] rounded-[3px] episodes-image"
                                alt={episode.title}
                                src={episode.posterUrl}
                                key={episode.episode_id}
                            />
                            <div className="episodes-btnplay">
                                <CaretRightOutlined />
                            </div>
                        </Link>
                        <p className="episodes-des">
                            Giang Quân và Viên Soái là "thanh mai trúc mã", nhưng cô lại đem lòng
                            yêu người khác.
                        </p>
                    </Badge.Ribbon>
                ))}
            </div>
        </>
    );
};

export default FilmDetailEpisodes;
