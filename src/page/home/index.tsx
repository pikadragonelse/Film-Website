import { useState, useEffect } from 'react';
import Slide from '../../component/slide';
import { request } from '../../utils/request';
import { ListFilm } from '../../component/list-film';
import { Film } from '../../model/film';
import './index.scss';
import axios from 'axios';

export type DataMovieByGenre = {
    genreId: number;
    name: string;
    movies: Film[];
};

export const HomePage = () => {
    const [trendingData, setTrendingData] = useState<Film[]>([]);
    const [dataMovieByGenre, setDataMovieByGenre] = useState<DataMovieByGenre[]>([]);
    const fetchTrending = async () => {
        try {
            const response = await request.get('movies/home/trending?', {
                params: {
                    page: 1,
                    pageSize: 1,
                },
            });
            const data = response.data;
            setTrendingData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getMovieByGenre = () => {
        axios
            .get('http://localhost:8000/api/home/genres', {
                headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
                setDataMovieByGenre(response.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchTrending();
        getMovieByGenre();
    }, []);
    return (
        <div>
            <Slide />
            <div className="container-home"></div>
            <ListFilm title="Phim thịnh hành" listFilm={trendingData} />
            {dataMovieByGenre.map((listMovie) => (
                <ListFilm
                    title={listMovie.name}
                    listFilm={listMovie.movies}
                    genreId={listMovie.genreId}
                />
            ))}
        </div>
    );
};
