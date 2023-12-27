import {
    CaretRightOutlined,
    CheckOutlined,
    HeartFilled,
    HeartOutlined,
    PlusOutlined,
    ShareAltOutlined,
    SmallDashOutlined,
} from '@ant-design/icons';
import { Divider, Modal, Progress, Spin, message, notification } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import { FilmItem } from '../film-item';
import { FilmDetailTab } from './film-detail-tab';
import './index.scss';

interface Genre {
    id: number;
    name: string;
}

export const FilmDetail = () => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const { id } = useParams<{ id: string }>();
    const [filmDetail, setFilmDetail] = useState<any>(null);
    const [addedToCollection, setAddedToCollection] = useState<boolean>(false);
    const [addedToLove, setAddedToLove] = useState<boolean>(false);
    const [dataLove, setDataLove] = useState<FilmItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCodeUrl] = useState<string | null>(null);
    const [shareModalVisible, setShareModalVisible] = useState(false);
    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);
    const [copiedLink, setCopiedLink] = useState<string | null>(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    let firstEpisodeId: number | null = null;
    //check watch later
    const [dataCollect, setDataCollect] = useState<FilmItem[]>([]);
    const handleUnauthorizedAction = () => {
        notification.warning({
            message: 'Thông báo',
            description: 'Vui lòng đăng nhập để thực hiện hành động này.',
        });
    };

    console.log('filmDetail', filmDetail);

    const handleShare = async () => {
        if (isUserLoggedIn) {
            const movieId = filmDetail?.movieId;
            const actorLink = encodeURIComponent(`${window.location.origin}/movie/${movieId}`);

            try {
                const response = await fetch(
                    `http://localhost:8000/api/movies/get/qrcode?url=${actorLink}`,
                );

                if (response.ok) {
                    const data = await response.json();
                    setQrCodeUrl(data.qrCode);
                    if (typeof data.qrCode === 'string') {
                        const regex = /(data:image\/png;base64,[^'"]+)/;
                        const match = data.qrCode.match(regex);

                        if (match) {
                            const base64Value = match[1];
                            setQrCodeUrl(base64Value || '');
                        }
                    }
                    setShareModalVisible(true);
                } else {
                    console.error('Failed to fetch QR code URL');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            handleUnauthorizedAction();
        }
    };

    const handleCopyLink = () => {
        if (copiedLink) {
            navigator.clipboard.writeText(copiedLink);
            message.success('Sao chép thành công');
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
            const movieData = await fetch(`http://localhost:8000/api/movies/${id}`).then((res) =>
                res.json(),
            );
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
                        <p className="text-white font-medium text-lg">Đánh giá</p>
                        <div>
                            <Progress
                                type="circle"
                                size={68}
                                percent={filmDetail.averageRating * 10}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 items-center">
                        <p className="text-white font-medium text-lg">Lượt yêu thích</p>
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
                title={<p className="flex items-center justify-center mb-2">Chia sẻ</p>}
                visible={shareModalVisible}
                footer={null}
                onCancel={() => setShareModalVisible(false)}
                width={450}
            >
                <div className="flex gap-10 items-center justify-center">
                    <a
                        className="modal-item flex flex-col items-center"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            copiedLink || '',
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="modal-img ml-4"
                            src="https://www.iqiyipic.com/lequ/20220216/Facebook@3x.png"
                            alt="facebook"
                        />
                        <p className="text-sm mt-2"> Facebook</p>
                    </a>

                    <a className="modal-item  flex flex-col" onClick={handleCopyLink}>
                        <img
                            className="modal-img ml-4"
                            src="https://www.iqiyipic.com/lequ/20220216/copylink@2x.png"
                            alt="addresss"
                        />
                        <p className="text-sm mt-2">Sao chép link</p>
                    </a>
                </div>
                <Divider className="!bg-gray-600" />
                <div className="flex flex-col justify-center items-center mt-4">
                    <p>Quét để chia sẻ trên thiết bị di động</p>
                    {qrCode ? (
                        <img
                            src={qrCode}
                            alt="QR Code"
                            style={{ width: '100px', height: '100px', marginTop: '15px' }}
                        />
                    ) : (
                        <Spin></Spin>
                    )}
                </div>
            </Modal>
        </div>
    );
};
