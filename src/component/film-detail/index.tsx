import {
    CaretRightOutlined,
    CheckOutlined,
    HeartFilled,
    HeartOutlined,
    PlusOutlined,
    ShareAltOutlined,
    SmallDashOutlined,
} from '@ant-design/icons';
import { Modal, Progress, Spin, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import { FilmItem } from '../film-item';
import { FilmDetailTab } from './film-detail-tab';
import './index.scss';
import { endpoint } from '../../utils/baseUrl';

interface Genre {
    id: number;
    name: string;
}

export const FilmDetail = () => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const { id } = useParams<{ id: string }>();
    const [filmDetail, setFilmDetail] = useState<any>(null);
    //bộ sưu tập
    const [addedToCollection, setAddedToCollection] = useState<boolean>(false);
    //yêu thích
    const [addedToLove, setAddedToLove] = useState<boolean>(false);
    const [dataLove, setDataLove] = useState<FilmItem[]>([]);
    const [loading, setLoading] = useState(true);

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);

    let firstEpisodeId: number | null = null;
    //check watch later
    const [dataCollect, setDataCollect] = useState<FilmItem[]>([]);
    const handleUnauthorizedAction = () => {
        notification.warning({
            message: 'Thông báo',
            description: 'Vui lòng đăng nhập để thực hiện hành động này.',
        });
    };
    const handleShare = () => {
        if (!isUserLoggedIn) {
            handleUnauthorizedAction();
        }
    };

    const fetchWatchLaterList = async () => {
        try {
            const response = await request.get('user/get-watch-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataCollect(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInCollections = (data: FilmItem, dataCollect: FilmItem[]) => {
        if (data && data.movieId) {
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === data.movieId,
            );
            setAddedToCollection(isFilmDetailInWatchLater);
        }
    };

    const fetchData = async () => {
        try {
            const movieData = await fetch(`${endpoint}/api/movies/${id}`).then((res) => res.json());
            setFilmDetail(movieData.movie);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataAndWatchLaterList = async () => {
        checkFilmDetailsInCollections(filmDetail, dataCollect);
    };
    //check lovemovie
    const fetchLoveList = async () => {
        try {
            const response = await request.get('user/get-favorite-movie-list?page=1&pageSize=100', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataLove(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const checkFilmDetailsInLove = (data: FilmItem, dataLove: FilmItem[]) => {
        if (data && data.movieId) {
            const isFilmDetailInLove = dataLove.some((item: FilmItem) => item.id === data.movieId);
            setAddedToLove(isFilmDetailInLove);
        }
    };

    const fetchDataAndLoveList = async () => {
        checkFilmDetailsInLove(filmDetail, dataLove);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchWatchLaterList();
    }, [addedToCollection]);

    useEffect(() => {
        fetchLoveList();
    }, [addedToLove]);

    useEffect(() => {
        fetchDataAndWatchLaterList();
        fetchDataAndLoveList();
    }, [isUserLoggedIn, id, filmDetail, dataCollect, dataLove]);
    if (!filmDetail) {
        return <Spin spinning={loading} size="large" className="mt-96" />;
    }

    if (filmDetail.episodes && filmDetail.episodes.length > 0) {
        const firstEpisode = filmDetail.episodes[0];
        firstEpisodeId = firstEpisode.episode_id;
    }

    //api add bộ sưu tập
    const handleAddToCollection = async () => {
        if (!isUserLoggedIn) {
            handleShare();
        }
        if (filmDetail && filmDetail.movieId) {
            const isFilmDetailInWatchLater = dataCollect.some(
                (item: FilmItem) => item.id === filmDetail.movieId,
            );
            if (!isFilmDetailInWatchLater) {
                try {
                    const response = await request.get(`user/add-watch-list?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToCollection(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            if (isFilmDetailInWatchLater) {
                try {
                    const response = await request.delete(`user/delete-watch-list?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToCollection(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
    //api love movie
    const handleAddToLove = async () => {
        if (!isUserLoggedIn) {
            handleShare();
        }
        if (filmDetail && filmDetail.movieId) {
            const isFilmDetailInLove = dataLove.some(
                (item: FilmItem) => item.id === filmDetail.movieId,
            );
            if (!isFilmDetailInLove) {
                try {
                    const response = await request.get(`user/add-favorite-movie?movieId=${id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                    if (response.data.status === 'Ok!') {
                        setAddedToLove(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            if (isFilmDetailInLove) {
                try {
                    const response = await request.delete(
                        `user/delete-favorite-movie?movieId=${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );
                    if (response.data.status === 'Ok!') {
                        setAddedToLove(false);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <div className="film-detail flex-grow mb-[450px]">
            <div
                style={{
                    backgroundImage: `url(${filmDetail.backgroundURL})`,
                }}
                className="bg-center bg-no-repeat md:h-[400px] h-[300px] relative"
            >
                <div className="bg-gradient-to-br from-transparent to-black/90 h-full ">
                    <div className="flex flex-col md:flex-row bottom-[-85%] md:bottom-[20%] items-start tw-absolute-center-horizontal   ">
                        <div className="film-detail__name flex gap-10 items-center">
                            <img
                                className="film-detail__poster"
                                src={filmDetail.posterURL}
                                alt="poster"
                            />
                            <div className="film-detail__title">{filmDetail.title}</div>
                        </div>

                        {/* Info */}
                        <div className="film-detail__header mb-6">
                            <div className="film-detail__info">
                                <div className="film-detail__summary">
                                    {filmDetail.genres.slice(0, 4).map((genre: Genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-2 film-detail__padding"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="film-detail__listbutton">
                                    <Link
                                        to={`/movie/${filmDetail.movieId}/${firstEpisodeId}`}
                                        className="film-detail__watch flex items-center pl-3 pr-4 py-[6px] rounded-[6px] text-whitetransition duration-300 mt-[-10px] mr-3"
                                    >
                                        <CaretRightOutlined />
                                        <span className="ml-2 text-[1rem]">Xem ngay</span>
                                    </Link>

                                    <div
                                        className="film-detail__watch flex items-center pl-3 pr-4 py-[6px] rounded-[6px] text-whitetransition duration-300 mt-[-10px] mr-2 hover:cursor-pointer"
                                        onClick={handleAddToCollection}
                                    >
                                        {addedToCollection ? <CheckOutlined /> : <PlusOutlined />}
                                        <span className="ml-2 text-[1rem]">Xem sau</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 absolute top-[83%] right-[8%]">
                        <a
                            href="#icon"
                            className="h-10 w-10 rounded-full border-[1.5px] border-white "
                            onClick={handleAddToLove}
                        >
                            {addedToLove ? (
                                <HeartFilled
                                    style={{ color: '#cf1a1a' }}
                                    className="film-detail__icon"
                                />
                            ) : (
                                <HeartOutlined className="film-detail__icon" />
                            )}
                        </a>

                        <a
                            href="#icon"
                            className="h-10 w-10 rounded-full border-[1.5px] border-white  "
                        >
                            <ShareAltOutlined className="film-detail__icon" onClick={handleShare} />
                        </a>

                        <a
                            href="#icon"
                            className="h-10 w-10 rounded-full border-[1.5px] border-white"
                        >
                            <SmallDashOutlined className="film-detail__icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className='class="flex z-20 relative flex-col md:flex-row mt-32 md:mt-0 px-64'>
                <div className="shrink-0 md:max-w-[150px] flex items-center md:flex-col justify-center flex-row gap-20 mt-28  md:border-r border-gray-600 pt-2 ml-[-200px]">
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-white font-medium text-lg">RATING</p>
                        <div>
                            <Progress
                                type="circle"
                                size={68}
                                percent={filmDetail.averageRating * 10}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-white font-medium text-lg">VOTE COUNT</p>
                        <div>
                            <p> {filmDetail.numFavorite}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-grow min-h-[500px] px-20 mt-[-50px] detail-tabs">
                    <FilmDetailTab filmDetail={filmDetail} />
                </div>
            </div>
        </div>
    );
};
