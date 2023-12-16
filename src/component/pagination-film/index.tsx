import React, { useState, useEffect } from 'react';
import { CloseOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Row, Pagination } from 'antd';
import './index.scss';
import { FilmItem } from '../film-item';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDataCollect } from '../../redux/dataCollectSlide';
import Cookies from 'js-cookie';
import { request } from '../../utils/request';

const moment = require('moment');

export type PaginationFilmProps = {
    title?: string;
    listFilm: Array<FilmItem>;
    number: number;
    onCancelClick?: ((filmName: string) => void) | boolean;
    context?: string;
    amountMovies?: number;
    currPage?: number;
    setCurrPage?: (props?: any) => void;
    hidden?: boolean;
};

export const PaginationFilm = ({
    title,
    listFilm: searchResults,
    number,
    onCancelClick,
    context,
    amountMovies,
    currPage,
    setCurrPage = () => {},
    hidden,
}: PaginationFilmProps) => {
    const [open, setOpen] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<FilmItem | null>(null);

    const showModal = (film: FilmItem) => {
        setSelectedFilm(film);
        setOpen(true);
    };

    const handleCancel = () => {
        setSelectedFilm(null);
        setOpen(false);
    };

    const handleOkClick = () => {
        if (selectedFilm) {
            handleCancelClick(selectedFilm.id || 0, context || '');
            handleCancel();
        }
    };

    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const handleCancelClick = async (filmId: number, context: string) => {
        try {
            let apiEndpoint = '';
            if (context === 'watchList') {
                apiEndpoint = 'user/delete-watch-list';
            } else if (context === 'favoriteList') {
                apiEndpoint = 'user/delete-favorite-movie';
            } else if (context === 'historyList') {
                apiEndpoint = 'user/delete-movie-history';
            }

            const endpointWithParams =
                context === 'historyList'
                    ? `${apiEndpoint}?episodeId=${filmId}`
                    : `${apiEndpoint}?movieId=${filmId}`;

            const response = await request.delete(endpointWithParams, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="list-film min-h-[60vh]" hidden={hidden}>
            <div className="header-list-film">
                <VideoCameraOutlined className="header-list-film-icon" />
                <p className="header-list-film-title">{title}</p>
            </div>
            <div className="content-list-film">
                <Row gutter={[12, 24]}>
                    {searchResults.map((result, index) => (
                        <Col span={number} key={index}>
                            {result.id && result.movieId ? (
                                <Link to={`/movie/${result.movieId}/${result.id}`}>
                                    <FilmItem
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        posterURL={result.posterURL || ''}
                                    />
                                </Link>
                            ) : (
                                <Link to={`/movie/${result.id || result.movieId}`}>
                                    <FilmItem
                                        title={result.title || ''}
                                        episodeNum={result.episodeNum}
                                        releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                        posterURL={result.posterURL || ''}
                                    />
                                </Link>
                            )}
                            <button onClick={() => showModal(result)}>
                                {onCancelClick ? (
                                    <div className="btn-close">
                                        <CloseOutlined />
                                    </div>
                                ) : undefined}
                            </button>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className="footer-list-film">
                <Pagination
                    current={currPage}
                    defaultPageSize={12}
                    total={amountMovies}
                    onChange={(event) => setCurrPage(event)}
                />
            </div>

            <Modal title="Dọn dẹp!" visible={open} onOk={handleOkClick} onCancel={handleCancel}>
                <p>{`Bạn chắc chắn muốn xóa "${selectedFilm?.title}" ?`}</p>
            </Modal>
        </div>
    );
};
