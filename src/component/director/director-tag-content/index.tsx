import React from 'react';
import { PaginationFilm } from '../../pagination-film';
import { FilmItem } from '../../film-item';

interface TabContentProps {
    isActive: boolean;
    id: string;
    filmMap: Array<FilmItem>;
}

export const TabContent: React.FC<TabContentProps> = ({ isActive, id, filmMap }) => {
    return (
        <div className={isActive ? 'block' : 'hidden'} id={id}>
            <div style={{ marginLeft: '30px' }} className="content-page">
                <PaginationFilm listFilm={filmMap} number={4.8} />
            </div>
        </div>
    );
};
