import React from 'react';
import './index.scss';
import { PaginationFilm } from '../pagination-film';
import { FilmItem } from '../film-item';

const filmMap: Array<FilmItem> = [
    {
        name: 'Film 1',
        yearOfManufacture: 2021,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        name: 'Film 3',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 4',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 5',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 6',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        name: 'Film 7',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        name: 'Film 8',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        name: 'Film 9',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        name: 'Film 10',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        name: 'Film 11',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        name: 'Film 12',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
    {
        name: 'Film 13',
        yearOfManufacture: 2021,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        name: 'Film 14',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        name: 'Film 15',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 22',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 32',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 42',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
];
export const WatchLater = () => {
    return (
        <div className="content-page">
            <PaginationFilm
                listFilm={filmMap}
                number={4.8}
                onCancelClick={true}
            />
        </div>
    );
};
