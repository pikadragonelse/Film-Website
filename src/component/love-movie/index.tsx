import React from 'react';
import './index.scss';
import { PaginationFilm } from '../pagination-film';
import { FilmItem } from '../film-item';

interface LoveMoviesProps {
    dataLovemovies: FilmItem[];
}

export const LoveMovies = ({ dataLovemovies }: LoveMoviesProps) => {
    return (
        <div className="content-page-love-movies">
            {dataLovemovies.length !== 0 ? (
                <PaginationFilm
                    title="Phim yêu thích"
                    listFilm={dataLovemovies}
                    number={4.8}
                    onCancelClick={true}
                    context="favoriteList"
                />
            ) : (
                <p>Danh sách yêu thích còn trống</p>
            )}
        </div>
    );
};
