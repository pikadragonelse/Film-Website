import React from 'react';
import './index.scss';
import { PaginationFilm } from '../pagination-film';
import { FilmItem } from '../film-item';

interface HistoryMoviesProps {
    dataHistorymovies: FilmItem[];
}

export const HistoryMovies = ({ dataHistorymovies }: HistoryMoviesProps) => {
    return (
        <div className="content-page-love-movies">
            {dataHistorymovies.length !== 0 ? (
                <PaginationFilm
                    title="Bộ sưu tập phim"
                    listFilm={dataHistorymovies}
                    number={4.8}
                    onCancelClick={true}
                />
            ) : (
                <p>Lịch sử phim còn trống</p>
            )}
        </div>
    );
};
