import { BackTop, Spin, Tooltip } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FilmItem } from '../../component/film-item';
import { HistoryMoviesHome } from '../../component/history-home';
import { CastFamousHome } from '../../component/home-cast-famous';
import { ListFilm } from '../../component/list-film';
import { ListReserveMovies } from '../../component/list-reserve-movie';
import Slide from '../../component/slide';
import { DAFilm, Film } from '../../model/film';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import './index.scss';

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
    const [dataActorFamous, setDataActorFamous] = useState<DAFilm[]>([]);
    const [dataHistorymovies, setDataHistorymovies] = useState<FilmItem[]>([]);
    const [dataReserve, setDataReserve] = useState<Film[]>([]);
    const [dataRecommend, setRecommened] = useState<Film[]>([]);
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);
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
            const response = await request.get('home/genres?page=1&pageSize=20', {
                headers: { 'Content-Type': 'application/json' },
            });
            setDataMovieByGenre(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getActorFamous = async () => {
        try {
            const response = await request.get('individuals/actors?page=1&pageSize=20');
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

    const fetchUpcomping = async () => {
        try {
            const response = await request.get('movies/home/upcoming');
            setDataReserve(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommend = async () => {
        try {
            const headers = isUserLoggedIn ? { Authorization: `Bearer ${accessToken}` } : {};
            const response = await request.get('movies/recommend/get?page=1&pageSize=20', {
                headers,
            });
            setRecommened(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataHistorymovies = async () => {
        try {
            const response = await request.get('user/get-movie-history-list?page=1&pageSize=1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setDataHistorymovies(response.data.data.ListMovie);
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
                    fetchUpcomping(),
                    fetchRecommend(),
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
                <ListFilm isShow={false} title="Phim thịnh hành" listFilm={trendingData} />
                <HistoryMoviesHome dataHistorymovies={dataHistorymovies} />
                <div className="!mt-10"></div>
                <ListFilm isShow={false} title="Dành cho VIP" listFilm={dataFilmVip} />
                <ListFilm isShow={false} title="Hôm nay xem gì ?" listFilm={dataRecommend} />
                <Link
                    to={'/VIPpackage'}
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <img
                        className="ml-20 w-[91%] rounded-md h-[88px]"
                        src="http://u2.iqiyipic.com/intl_lang/20230222/48/21/intl_lang_65c467fd4f698e25c02870407453_default.jpg"
                        alt=""
                    />
                </Link>
                <ListReserveMovies listFilm={dataReserve} />
                {dataActorFamous.length > 0 && (
                    <CastFamousHome title="Người nổi tiếng" DAlist={dataActorFamous} size={146} />
                )}
                {renderListFilmsByGenre()}
            </Spin>
        </div>
    );
};
