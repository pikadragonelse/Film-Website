import React, { useEffect, useState } from 'react';
import './index.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { CaretRightOutlined, InfoCircleOutlined } from '@ant-design/icons';
interface Movie {
    id: number;
    backdrop_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

const Slide: React.FC = () => {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US',
        )
            .then((res) => res.json())
            .then((data) => setPopularMovies(data.results));
    }, []);

    return (
        <div className="poster">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {popularMovies.map((movie) => (
                    <div>
                        <Link
                            className="poster__item"
                            style={{ textDecoration: 'none', color: 'white' }}
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                        >
                            <div className="poster__image">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${
                                        movie && movie.backdrop_path
                                    }`}
                                    alt={movie.original_title}
                                />
                            </div>
                            <div className="poster__image-overlay">
                                <div className="poster__image-title">
                                    {movie ? movie.original_title : ''}
                                </div>
                                <div className="poster__image-runtime">
                                    <span className="poster__image-padding">
                                        {movie ? movie.release_date : ''}
                                    </span>

                                    <span className="poster__image-rating poster__image-padding">
                                        {movie ? movie.vote_average : ''}
                                    </span>

                                    <span className="poster__image-padding">
                                        Hàn Quốc
                                    </span>
                                </div>

                                <div className="poster__image-description">
                                    {movie ? movie.overview : ''}
                                </div>

                                <div>
                                    <a href="#_" className="btn">
                                        <CaretRightOutlined className="btn-icon" />
                                        Xem ngay
                                    </a>

                                    <a href="#_" className="btn btn-outline">
                                        <InfoCircleOutlined className="btn-icon" />
                                        Xem chi tiết
                                    </a>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Slide;
