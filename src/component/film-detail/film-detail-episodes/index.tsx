import { Badge } from 'antd';
import React from 'react';
import './index.scss';

interface Episode {
    episodeId: number;
    title: string;
    posterUrl: string;
}

interface FilmDetail {
    episodes: Episode[];
}

interface FilmDetailEpisodesProps {
    filmDetail: FilmDetail;
}

const FilmDetailEpisodes: React.FC<FilmDetailEpisodesProps> = ({ filmDetail }) => {
    const { episodes } = filmDetail;

    return (
        <>
            <p className="episodes-length">Tổng số tập : {episodes.length}</p>

            <div className="grid grid-cols-6 gap-10 mt-8 gap-y">
                {episodes.map((episode) => (
                    <Badge.Ribbon text={episode.title} color="red">
                        <img
                            style={{ objectFit: 'cover' }}
                            alt={episode.title}
                            src={episode.posterUrl}
                            key={episode.episodeId}
                        />
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
