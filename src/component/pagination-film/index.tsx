import React, { useState, useEffect } from 'react';
import { CloseOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Row, Pagination } from 'antd';
import './index.scss';
import { FilmItem } from '../film-item';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDataCollect } from '../../redux/dataCollectSlide';

const moment = require('moment');

export type PaginationFilmProps = {
    title?: string;
    listFilm: Array<FilmItem>;
    number: number;
    onCancelClick?: ((filmName: string) => void) | boolean;
};

export const PaginationFilm = ({
    title,
    listFilm: searchResults,
    number,
    onCancelClick,
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

    const [currentPage, setCurrentPage] = useState(1);
    const [listFilm, setListFilm] = useState(searchResults);
    useEffect(() => {
        setListFilm(searchResults);
    }, [searchResults]);

    const [displayedResults, setDisplayedResults] = useState<Array<FilmItem>>([]);
    const resultsPerPage = 12;

    useEffect(() => {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        console.log(listFilm);
        const updatedDisplayedResults = listFilm.slice(startIndex, endIndex);
        setDisplayedResults(updatedDisplayedResults);
    }, [listFilm, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOkClick = () => {
        if (selectedFilm) {
            handleCancelClick(selectedFilm.title || '');
            handleCancel();
        }
    };

    const dispatch = useDispatch();
    const handleCancelClick = (filmName: string) => {
        const updatedListFilm = listFilm.filter((film) => film.title !== filmName);
        setListFilm(updatedListFilm);
        dispatch(setDataCollect(updatedListFilm));
    };

    return (
        <div className="list-film">
            <div className="header-list-film">
                <VideoCameraOutlined className="header-list-film-icon" />
                <p className="header-list-film-title">{title}</p>
            </div>
            <div className="content-list-film">
                <Row gutter={[12, 24]}>
                    {displayedResults.map((result, index) => (
                        <Col span={number} key={index}>
                            <Link to={`/movie/${result.movieId}`}>
                                <FilmItem
                                    title={result.title || ''}
                                    episodeNum={result.episodeNum}
                                    releaseDate={moment(result.releaseDate).format('YYYY') || 0}
                                    posterURL={result.posterURL || ''}
                                    onCancelClick={
                                        onCancelClick ? () => showModal(result) : undefined
                                    }

                                />
                            </Link>
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
                    current={currentPage}
                    defaultPageSize={resultsPerPage}
                    total={listFilm.length}
                    onChange={handlePageChange}
                />
            </div>

            <Modal title="Dọn dẹp!" visible={open} onOk={handleOkClick} onCancel={handleCancel}>
                <p>{`Bạn chắc chắn muốn xóa "${selectedFilm?.title}" ?`}</p>
            </Modal>
        </div>
    );
};
