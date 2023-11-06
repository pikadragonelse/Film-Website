import {
    CaretRightOutlined,
    HeartFilled,
    HeartOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { Start } from '../../asset/icon/start';
import { RootState } from '../../redux/store';
import './index.scss';

interface Movie {
    movieId: number;
    backgroundURL: string;
    title: string;
    releaseDate: string;
    averageRating: number;
    description: string;
    episodeNum: string;
    genres: Array<Genres>;
}
interface Genres {
    genre_id: number;
    name: string;
}

const Slide: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isHeartFilled, setIsHeartFilled] = useState<boolean[]>([]);
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    const isUserLoggedIn = useSelector((state: RootState) => state.user.isLogin);

    useEffect(() => {
        fetch('http://localhost:8000/api/movies')
            .then((res) => res.json())
            .then((data) => {
                setPopularMovies(data);
                setIsHeartFilled(new Array(data.length).fill(false));
            });
    }, []);

    const handleCarouselChange = () => {
        setIsTitleVisible(false);
        setTimeout(() => {
            setIsTitleVisible(true);
        }, 500);
    };

    function formatYear(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const handleShareClick = () => {
        if (isUserLoggedIn) {
        } else {
            setModalVisible(true);
        }
    };

    const handleHeartClick = (index: number) => {
        if (isUserLoggedIn) {
            const updatedHearts = [...isHeartFilled];
            updatedHearts[index] = !updatedHearts[index];
            setIsHeartFilled(updatedHearts);
        } else {
            setModalVisible(true);
        }
    };
    return (
        <div className="poster">
            <Carousel
                className="slide"
                showThumbs={false}
                autoPlay={true}
                transitionTime={4}
                infiniteLoop={true}
                showStatus={false}
            >
                {popularMovies.map((movie, index) => (
                    <div className="poster__item slide-item" key={movie.movieId}>
                        <div className="poster__image">
                            <img src={movie.backgroundURL} alt={movie.title} />
                        </div>
                        <div className="overlay"></div>

                        <div className="poster__image-overlay">
                            <div
                                className={`poster__image-title ${isTitleVisible ? 'visible' : ''}`}
                            >
                                <h2 className="md:text-5xl font-black tracking-normal md:tw-multiline-ellipsis-2 tw-multiline-ellipsis-3">
                                    {movie ? movie.title : ''}
                                </h2>
                            </div>

                            <h2
                                className={`poster__image-listInfo ${
                                    isTitleVisible ? 'visible' : ''
                                }`}
                            >
                                <span
                                    className="poster__movie-info"
                                    style={{
                                        color: '#cf1a1a',
                                    }}
                                >
                                    <Start />
                                    <p style={{ fontWeight: 600, marginLeft: '5px' }}>
                                        {movie.averageRating}
                                    </p>
                                </span>
                                <span className="poster__movie-info">
                                    <p>{movie ? formatYear(movie.releaseDate) : ''}</p>
                                </span>
                                <span>
                                    <p>Trọn bộ {movie.episodeNum} tập</p>
                                </span>
                            </h2>
                            <div
                                className={`poster__image-runtime ${
                                    isTitleVisible ? 'visible' : ''
                                }`}
                            >
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.genre_id}
                                        className="px-3 py-1  poster__image-padding"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div
                                className={`poster__image-description ${
                                    isTitleVisible ? 'visible' : ''
                                }`}
                            >
                                {movie ? movie.description : ''}
                            </div>

                            <div
                                className={`poster__image-listButton ${
                                    isTitleVisible ? 'visible' : ''
                                }`}
                            >
                                <Link
                                    className="btn"
                                    style={{ textDecoration: 'none', color: 'white' }}
                                    to={`/movie/${movie.movieId}`}
                                    key={movie.movieId}
                                >
                                    <a href="#_">
                                        <CaretRightOutlined className="btn-icon" />
                                        Xem ngay
                                    </a>
                                </Link>

                                {isHeartFilled[index] ? (
                                    <HeartFilled
                                        twoToneColor="#cf1a1a"
                                        style={{ color: '#cf1a1a' }}
                                        className="btn-heart btn-heart__click"
                                        onClick={() => handleHeartClick(index)}
                                    />
                                ) : (
                                    <HeartOutlined
                                        className="btn-heart"
                                        onClick={() => handleHeartClick(index)}
                                    />
                                )}
                                <ShareAltOutlined
                                    className="btn-heart ml-4"
                                    onClick={handleShareClick}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            <Modal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={
                    <Button
                        className="poster__image-close"
                        type="primary"
                        onClick={() => setModalVisible(false)}
                    >
                        Đóng
                    </Button>
                }
                style={{ textAlign: 'center', marginTop: '100px' }}
            >
                <div className="poster__image-notifi">Thông báo</div>
                <p className="poster__image-notifititle">
                    Vui lòng{' '}
                    <Link style={{ color: 'var(--primary-color)', fontWeight: 700 }} to="/login">
                        Đăng nhập
                    </Link>{' '}
                    để tiếp tục sử dụng dịch vụ.
                </p>
            </Modal>
        </div>
    );
};

export default Slide;
