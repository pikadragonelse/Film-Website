import { BackTop, Spin, Tooltip } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { FilmItem } from '../../component/film-item';
import { HistoryMoviesHome } from '../../component/history-home';
import { ActorFamous, ActorFamousInfo } from '../../component/list-actor-famous';
import { ListFilm } from '../../component/list-film';
import Slide from '../../component/slide';
import { Film } from '../../model/film';
import { request } from '../../utils/request';
import './index.scss';
import ReserveMovies from '../../component/reserve-movie';
import { ListReserveMovies } from '../../component/list-reserve-movie';

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
    const [dataHistorymovies, setDataHistorymovies] = useState<FilmItem[]>([]);

    const fetchTrending = async () => {
        try {
            const response = await request.get('movies/home/trending');
            setTrendingData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getMovieByGenre = async () => {
        try {
            const response = await axios.get(
                'http://movies.southeastasia.cloudapp.azure.com:8000/api/home/genres?page=1&pageSize=20',
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            setDataMovieByGenre(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getActorFamous = async () => {
        try {
            const response = await axios.get(
                'http://movies.southeastasia.cloudapp.azure.com:8000/api/individuals/actors?page=1&pageSize=20',
            );
            setDataActorFamous(response.data.data.actors);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVip = async () => {
        try {
            const response = await request.get('movies/home/vip');
            setDataFimlVip(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';

    const fetchDataHistorymovies = async () => {
        try {
            const response = await request.get('user/get-movie-history-list?page=1&pageSize=1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setDataHistorymovies(response.data.data.ListMovie);
            console.log('response.data.data.ListMovie', response.data.data.ListMovie);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchTrending(),
                    getMovieByGenre(),
                    getActorFamous(),
                    fetchVip(),
                    fetchDataHistorymovies(),
                ]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };

        fetchData();
    }, []);

    const renderListFilmsByGenre = () => {
        return dataMovieByGenre.map((listMovie) => (
            <ListFilm
                key={listMovie.genreId}
                title={listMovie.name}
                listFilm={listMovie.movies}
                genreId={listMovie.genreId}
            />
        ));
    };

    return (
        <div>
            <Tooltip title="Quay về đầu trang" placement="left">
                <BackTop className="bg-[#313439] rounded-full text-red " visibilityHeight={200} />
            </Tooltip>
            <Slide />
            <div className="container-home"></div>
            <Spin spinning={loading} size="large" className="mt-96">
                <ListFilm title="Phim thịnh hành" listFilm={trendingData} />
                <ListFilm title="Dành cho VIP" listFilm={dataFilmVip} />
                <HistoryMoviesHome dataHistorymovies={dataHistorymovies} />
                <img
                    className="ml-20 w-[91%] rounded-md h-[88px]"
                    src="http://u2.iqiyipic.com/intl_lang/20230222/48/21/intl_lang_65c467fd4f698e25c02870407453_default.jpg"
                    alt=""
                />
                <ReserveMovies />
                <ListReserveMovies listFilm={trendingData} />
                {dataActorFamous.length > 0 && (
                    <ActorFamous
                        title="Người nổi tiếng"
                        actors={dataActorFamous}
                        size={146}
                        isShow={false}
                    />
                )}
                {renderListFilmsByGenre()}
            </Spin>
        </div>
    );
};
