import React from 'react';
import './index.scss';

export type FilmItem = {
    name: string;
    yearOfManufacture: number;
    category: string;
    poster: string;
};
export const FilmItem = ({
    name,
    yearOfManufacture,
    category,
    poster,
}: FilmItem) => {
    return (
        <div className="film-item-container">
            <div className="film-item-info">
                <h1 className="film-item-title">{name}</h1>
                <p className="film-item-sub-info">
                    {yearOfManufacture}•{category}
                </p>
            </div>
            <img src={poster} alt="" className="film-item-image" />
        </div>
    );
};
