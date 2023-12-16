import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ItemHistoryHome } from '../../item-history-home';
import { PaginationFilmProps } from '../pagination-film';
import './index.scss';

const moment = require('moment');

export const ListHistoryHome = ({ listFilm: searchResults }: PaginationFilmProps) => {
    return (
        <div className="list-film-history min-h-[60vh]">
            <div className="header-list-film">
                <p className="text-white text-[22px] font-medium ml-9">Tiếp tục xem</p>
            </div>
            <div className="content-list-film">
                <Row gutter={[14, 24]}>
                    {searchResults.map((result, index) => (
                        <Col key={index}>
                            {result.id && result.movieId ? (
                                <Link to={`/movie/${result.movieId}/${result.id}`}>
                                    <ItemHistoryHome
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        posterURL={result.posterURL || ''}
                                    />
                                </Link>
                            ) : (
                                <Link to={`/movie/${result.id || result.movieId}`}>
                                    <ItemHistoryHome
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        posterURL={result.posterURL || ''}
                                    />
                                </Link>
                            )}
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};
