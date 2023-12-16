import React, { useState, useEffect } from 'react';
import { Spin } from 'antd'; // Import Spin from Ant Design
import Slide from '../../component/slide';
import { request } from '../../utils/request';
import { ListFilm } from '../../component/list-film';
import { Film } from '../../model/film';
import './index.scss';
import axios from 'axios';
import { ActorFamous, ActorFamousInfo } from '../../component/list-actor-famous';

export type DataMovieByGenre = {
    genreId: number;
    name: string;
    movies: Film[];
};

export const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [trendingData, setTrendingData] = useState<Film[]>([]);
    const [dataFilmVip, setDataFimlVip] = useState<Film[]>([]);
    const [dataMovieByGenre, setDataMovieByGenre] = useState<DataMovieByGenre[]>([]);
    const [dataActorFamous, setDataActorFamous] = useState<ActorFamousInfo[]>([]);

    const fetchTrending = async () => {
        try {
            const response = await request.get('movies/home/trending');
            const data = response.data;
            setTrendingData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    };

    console.log('dataMovieByGenre', dataMovieByGenre);

    const getActorFamous = () => {
        axios
            .get('http://localhost:8000/api/individuals/actors')
            .then((response) => {
                setDataActorFamous(response.data.data.actors);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchVip = async () => {
        try {
            const response = await request.get('movies/home/vip');
            const data = response.data;
            setDataFimlVip(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrending();
        getMovieByGenre();
        getActorFamous();
        fetchVip();
    }, []);

    return (
        <div>
            <Slide />
            <div className="container-home"></div>
            <Spin spinning={loading} size="large" className="mt-96">
                <ListFilm title="Phim thịnh hành" listFilm={trendingData} />
                <ListFilm title="Dành cho VIP" listFilm={dataFilmVip} />
                <img
                    className="ml-20 w-[92%] rounded-md h-[86px]"
                    src="http://u2.iqiyipic.com/intl_lang/20230222/48/21/intl_lang_65c467fd4f698e25c02870407453_default.jpg"
                    alt=""
                />

                {dataActorFamous.length > 0 && <ActorFamous actors={dataActorFamous} />}

                {dataMovieByGenre.map((listMovie) => (
                    <ListFilm
                        key={listMovie.genreId}
                        title={listMovie.name}
                        listFilm={listMovie.movies}
                        genreId={listMovie.genreId}
                    />
                ))}
            </Spin>
        </div>
    );
};
