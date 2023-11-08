import React from 'react';
import './index.scss';
import { PaginationFilm } from '../pagination-film';
import { FilmItem } from '../film-item';

interface WatchLaterProps {
    dataCollect: FilmItem[];
}

export const WatchLater = ({ dataCollect }: WatchLaterProps) => {
    return (
        <div className="content-page-watch-later">
            {dataCollect.length !== 0 ? (
                <PaginationFilm
                    title="Bộ sưu tập phim"
                    listFilm={dataCollect}
                    number={4.8}
                    onCancelClick={true}
                />
            ) : (
                <p>Chưa xem phim nào</p>
            )}
        </div>
    );
};
