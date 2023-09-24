import React from 'react';
import { FilmItem } from '../film-item';
import { Row, Col } from 'antd';
import './index.scss';
import { useState } from 'react';
const films = [
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
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Hành động',
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Tình cảm',
        poster: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
    {
        name: 'Film 1',
        yearOfManufacture: 2021,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Kinh dị',
        poster: 'https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/iOJX54nVAsnPawagFiWXKv1Y6sB.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/waBWlJlMpyFb7STkFHfFvJKgwww.jpg',
    },
    {
        name: 'Film 2',
        yearOfManufacture: 2022,
        category: 'Thần thoại',
        poster: 'https://image.tmdb.org/t/p/original/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
    },
];

const genres = ['Hành động', 'Tình cảm', 'Kinh dị', 'Thần thoại'];

const FilmList = () => {
    const [showAll, setShowAll] = useState(false);

    const handleViewAllClick = () => {
        setShowAll(true);
    };

    return (
        <div className="film-list">
            {genres.map((genre, index) => (
                <div key={index} className="film-list__category">
                    <div className="film-list__header">
                        <h2 className="film-list__title">{genre}</h2>
                        <a
                            href="#"
                            className="film-list__view"
                            onClick={handleViewAllClick}
                        >
                            Xem tất cả
                        </a>
                    </div>
                    <Row gutter={[32, 32]}>
                        {films
                            .filter(
                                (film) => showAll || film.category === genre,
                            )
                            .map((film, index) => (
                                <Col span={4} key={index}>
                                    <FilmItem
                                        name={film.name}
                                        yearOfManufacture={
                                            film.yearOfManufacture
                                        }
                                        category={film.category}
                                        poster={film.poster}
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
            ))}
        </div>
    );
};

export default FilmList;
