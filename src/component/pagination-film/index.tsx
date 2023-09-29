// import React, { useState, useEffect } from 'react';
// import { VideoCameraOutlined } from '@ant-design/icons';
// import { Col, Row, Pagination } from 'antd';
// import './index.scss';
// import { FilmItem } from '../film-item';
// import { Button, Modal } from 'antd';

// export type PaginationFilm = {
//     title?: string;
//     listFilm: Array<FilmItem>;
//     number: number;
//     onCancelClick?: ((filmName: string) => void) | boolean;
// };

// export const PaginationFilm = ({
//     title,
//     listFilm: initialListFilm,
//     number,
//     onCancelClick,
// }: PaginationFilm) => {
//     const [open, setOpen] = useState(false);

//     const showModal = () => {
//         setOpen(true);
//     };

//     const handleCancel = () => {
//         setOpen(false);
//     };

//     const [currentPage, setCurrentPage] = useState(1);
//     const [listFilm, setListFilm] = useState(initialListFilm);
//     const [displayedResults, setDisplayedResults] = useState<Array<FilmItem>>(
//         [],
//     );
//     const resultsPerPage = 12;

//     useEffect(() => {
//         const startIndex = (currentPage - 1) * resultsPerPage;
//         const endIndex = startIndex + resultsPerPage;
//         const updatedDisplayedResults = listFilm.slice(startIndex, endIndex);
//         setDisplayedResults(updatedDisplayedResults);
//     }, [listFilm, currentPage]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleCancelClick = (filmName: string) => {
//         const updatedListFilm = listFilm.filter(
//             (film) => film.name !== filmName,
//         );

//         setListFilm(updatedListFilm);

//         if (typeof onCancelClick === 'function') {
//             onCancelClick(filmName);
//         }
//     };

//     return (
//         <div className="list-film">
//             <div className="header-list-film">
//                 <VideoCameraOutlined className="header-list-film-icon" />
//                 <p className="header-list-film-title">{title}</p>
//             </div>
//             <div className="content-list-film">
//                 <Row gutter={[12, 24]}>
//                     {displayedResults.map((result, index) => (
//                         <Col span={number} key={index}>
//                             <FilmItem
//                                 name={result.name || ''}
//                                 category={result.category || ''}
//                                 yearOfManufacture={
//                                     result.yearOfManufacture || 0
//                                 }
//                                 poster={result.poster || ''}
//                                 onCancelClick={
//                                     onCancelClick ? showModal : undefined
//                                 }
//                             />
//                             <Modal
//                                 title="Dọn dẹp!"
//                                 open={open}
//                                 onOk={() =>
//                                     handleCancelClick(result.name || '')
//                                 }
//                                 onCancel={handleCancel}
//                             >
//                                 <p>{`Bạn chắc chắn muốn xóa "${result.name}" ?`}</p>
//                             </Modal>
//                         </Col>
//                     ))}
//                 </Row>
//             </div>

//             <div className="footer-list-film">
//                 <Pagination
//                     current={currentPage}
//                     defaultPageSize={resultsPerPage}
//                     total={listFilm.length}
//                     onChange={handlePageChange}
//                 />
//             </div>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import { VideoCameraOutlined } from '@ant-design/icons';
import { Col, Row, Pagination } from 'antd';
import './index.scss';
import { FilmItem } from '../film-item';
import { Button, Modal } from 'antd';

export type PaginationFilmProps = {
    title?: string;
    listFilm: Array<FilmItem>;
    number: number;
    onCancelClick?: ((filmName: string) => void) | boolean;
};

export const PaginationFilm = ({
    title,
    listFilm: initialListFilm,
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
    const [listFilm, setListFilm] = useState(initialListFilm);
    const [displayedResults, setDisplayedResults] = useState<Array<FilmItem>>(
        [],
    );
    const resultsPerPage = 12;

    useEffect(() => {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const updatedDisplayedResults = listFilm.slice(startIndex, endIndex);
        setDisplayedResults(updatedDisplayedResults);
    }, [listFilm, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleOkClick = () => {
        if (selectedFilm) {
            handleCancelClick(selectedFilm.name || '');
            handleCancel();
        }
    };

    const handleCancelClick = (filmName: string) => {
        const updatedListFilm = listFilm.filter(
            (film) => film.name !== filmName,
        );

        setListFilm(updatedListFilm);
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
                            <FilmItem
                                name={result.name || ''}
                                category={result.category || ''}
                                yearOfManufacture={
                                    result.yearOfManufacture || 0
                                }
                                poster={result.poster || ''}
                                onCancelClick={
                                    onCancelClick
                                        ? () => showModal(result)
                                        : undefined
                                }
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

            <Modal
                title="Dọn dẹp!"
                visible={open}
                onOk={handleOkClick}
                onCancel={handleCancel}
            >
                <p>{`Bạn chắc chắn muốn xóa "${selectedFilm?.name}" ?`}</p>
            </Modal>
        </div>
    );
};
