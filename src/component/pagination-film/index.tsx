import React, { useState } from 'react';
import { VideoCameraOutlined } from '@ant-design/icons';
import { Col, Row, Pagination } from 'antd';
import './index.scss';
import { FilmItem } from '../film-item';

export type PaginationFilm = {
    title?: string;
    listFilm: Array<FilmItem>;
};
export const PaginationFilm = ({ title, listFilm }: PaginationFilm) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 12;
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const displayedResults = listFilm.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                        <Col
                            // xs={24}
                            // sm={12}
                            // md={8}
                            // lg={4}
                            className="gutter-row"
                            span={4}
                            key={index}
                        >
                            <FilmItem
                                name={result.name || ''}
                                category={result.category || ''}
                                yearOfManufacture={
                                    result.yearOfManufacture || 0
                                }
                                poster={result.poster || ''}
                            />
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
        </div>
    );
};
