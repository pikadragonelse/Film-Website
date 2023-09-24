import { DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import React, { useRef } from 'react';
import { FilmItem } from '../film-item';
import Title from 'antd/es/typography/Title';
import './index.scss';
import { CarouselRef } from 'antd/es/carousel';

export type ListFilm = {
    title?: string;
    subInfo?: Array<string>;
    sessions?: MenuProps['items'];
    listFilm: Array<Array<FilmItem>>;
    multiSessions?: boolean;
};
export const ListFilm = ({
    title,
    subInfo,
    sessions = [],
    listFilm,
    multiSessions = false,
}: ListFilm) => {
    const listRef = useRef<CarouselRef>(null);

    return (
        <div className="list-container">
            <div className="list-heading">
                <Title level={2} className="list-title">
                    {title}
                </Title>
                <div className="list-sub-info">
                    {subInfo?.map((item) => (
                        <p className="list-sub-info-item">{item}</p>
                    ))}
                </div>
            </div>
            <div
                className={`session-section ${
                    multiSessions === true ? 'show' : ''
                }`}
            >
                <Dropdown
                    menu={{ items: sessions }}
                    trigger={['click']}
                    className="session-section-select"
                >
                    <Button className="session-btn-select">
                        Mùa 1
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="list">
                <div
                    className="list-icon left-move-container"
                    onClick={() => {
                        listRef.current?.prev();
                    }}
                >
                    <LeftOutlined />
                </div>
                <div
                    className="list-icon right-move-container"
                    onClick={() => listRef.current?.next()}
                >
                    <RightOutlined />
                </div>
                <Carousel className="list-content" dots={false} ref={listRef}>
                    {listFilm.map((row) => (
                        <div>
                            <Row justify="center">
                                {row.map((value) => (
                                    <Col span={4} className="list-col">
                                        <FilmItem
                                            name={value.name}
                                            category={value.category}
                                            yearOfManufacture={
                                                value.yearOfManufacture
                                            }
                                            poster={value.poster}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
