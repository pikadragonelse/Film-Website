import {
    CaretRightOutlined,
    CheckOutlined,
    HeartOutlined,
    PlusOutlined,
    ShareAltOutlined,
    SmallDashOutlined,
} from '@ant-design/icons';
import { Modal, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { FilmDetailTab } from './film-detail-tab';
import './index.scss';
import { FilmItem } from '../film-item';
import { setDataCollect } from '../../redux/dataCollectSlide';
import { useDispatch } from 'react-redux';

interface Genre {
    id: number;
    name: string;
}

export const FilmDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [filmDetail, setFilmDetail] = useState<any>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    //bộ sưu tập
    const dispatch = useDispatch();
    const dataCollect = useSelector((state: RootState) => state.dataCollect.dataCollect);
    // const addedToCollection = useSelector(
    //     (state: RootState) => state.dataCollect.addedToCollection,
    // );
    const [addedToCollection, setAddedToCollection] = useState<boolean>(false);

    const handleOpenModal = () => {
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);

    let firstEpisodeId: number | null = null;
    useEffect(() => {
        fetch(`http://localhost:8000/api/movies/${id}`)
            .then((res) => res.json())
            .then((data) => setFilmDetail(data));
    }, [id]);
    useEffect(() => {
        if (isUserLoggedIn && filmDetail) {
            const isFilmDetailInCollection = dataCollect.some(
                (item: FilmItem) => item.movieId === filmDetail.movieId,
            );
            setAddedToCollection(isFilmDetailInCollection);
        } else {
            setAddedToCollection(false);
        }
    }, [isUserLoggedIn, dataCollect, filmDetail]);

    if (!filmDetail) {
        return <div>Loading...</div>;
    }

    // const formatter = (value: number) => <CountUp end={value} separator="," />;
    if (filmDetail.episodes && filmDetail.episodes.length > 0) {
        const firstEpisode = filmDetail.episodes[0];
        firstEpisodeId = firstEpisode.episode_id;
    }

    const handleAddToCollection = () => {
        if (isUserLoggedIn && filmDetail) {
            const isItemInCollection =
                Array.isArray(dataCollect) &&
                dataCollect.some((item: FilmItem) => item.movieId === filmDetail.movieId);

            if (!isItemInCollection) {
                const newFilmItem = {
                    movieId: filmDetail.movieId,
                    title: filmDetail.title,
                    description: filmDetail.description,
                    releaseDate: filmDetail.releaseDate,
                    nation: filmDetail.nation,
                    posterURL: filmDetail.posterURL,
                    trailerURL: filmDetail.trailerURL,
                    averageRating: filmDetail.averageRating,
                    episodeNum: filmDetail.episodes.length,
                    level: filmDetail.level,
                    genres: filmDetail.genres,
                    actors: filmDetail.actors,
                    episodes: filmDetail.episodes,
                    data: filmDetail.data,
                    onCancelClick: true,
                };
                setAddedToCollection(true);
                dispatch(setDataCollect([...dataCollect, newFilmItem]));
            }
            if (isItemInCollection) {
                const updatedCollection = dataCollect.filter(
                    (item: FilmItem) => item.movieId !== filmDetail.movieId,
                );
                setAddedToCollection(false);
                dispatch(setDataCollect(updatedCollection));
            }
        } else {
            handleOpenModal();
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
                                        <span className="ml-2 text-[1rem]">Sưu tập</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 absolute top-[83%] right-[8%]">
                        <a
                            href="#icon"
                            className="h-10 w-10 rounded-full border-[1.5px] border-white "
                        >
                            <HeartOutlined className="film-detail__icon" />
                        </a>

                        <a
                            href="#icon"
                            className="h-10 w-10 rounded-full border-[1.5px] border-white  "
                        >
                            <ShareAltOutlined className="film-detail__icon" />
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
            <Modal
                title="Thông báo"
                visible={showLoginModal}
                onOk={handleCloseModal}
                onCancel={handleCloseModal}
            >
                <p>Vui lòng đăng nhập để thêm vào bộ sưu tập.</p>
            </Modal>
        </div>
    );
};
