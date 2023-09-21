import React, { useRef, useState } from 'react';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import {
    CommentOutlined,
    DownOutlined,
    LeftOutlined,
    RightOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';
import { SubInfo } from '../../component/sub-info';
import { Button, Carousel, Col, Dropdown, MenuProps, Row } from 'antd';
import { FilmItem } from '../../component/film-item';
import { CarouselRef } from 'antd/es/carousel';
import Title from 'antd/es/typography/Title';

const subInfo: Array<SubInfo> = [
    {
        title: 'Diễn viên',
        content:
            'Monkey.D Luffy, Rononoa Zoro, Chopper, Usopp, Brook, Franky, Robin, Nami, Jinbei, Sanji',
    },
    {
        title: 'Thể loại',
        content: 'Anime',
    },
];

const items: MenuProps['items'] = [
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                1st menu item
            </a>
        ),
        key: '0',
    },
    {
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                2nd menu item
            </a>
        ),
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item（disabled）',
        key: '3',
        disabled: true,
    },
];

const filmMap: Array<FilmItem> = [
    {
        name: 'One piece',
        category: 'Anime',
        yearOfManufacture: 2023,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'One piece',
        category: 'Anime',
        yearOfManufacture: 2023,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'One piece',
        category: 'Anime',
        yearOfManufacture: 2023,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
    {
        name: 'One piece',
        category: 'Anime',
        yearOfManufacture: 2023,
        poster: 'https://images2.thanhnien.vn/528068263637045248/2023/7/5/anime-16885290131791004759743.jpg',
    },
];

export const WatchingPage = () => {
    const [playTime, setPlayTime] = useState(0);
    const listRef = useRef<CarouselRef>(null);

    const handleProgress = (state: OnProgressProps) => {
        setPlayTime(state.playedSeconds);
    };

    return (
        <div className="watching-container">
            <div className="watching-player-container">
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=oUFJJNQGwhk"
                    controls={true}
                    onProgress={handleProgress}
                    className="watching-player"
                    width="100%"
                    height={640}
                />
            </div>
            <div className="watching-info-container">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name="One piece"
                    hashtag={['Anime', '2023', 'HD']}
                    desc="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    view={30000000}
                    episode={1}
                />

                <div className="watching-sub-info-container">
                    <div className="watching-feature">
                        <IconWithText
                            icon={
                                <CommentOutlined className="watching-feature-icon" />
                            }
                            text="Bình luận"
                        />
                        <IconWithText
                            icon={
                                <ShareAltOutlined className="watching-feature-icon" />
                            }
                            text="Chia sẻ"
                        />
                    </div>
                    <div className="watching-sub-info">
                        {subInfo.map((value) => (
                            <SubInfo
                                title={value.title}
                                content={value.content}
                                className="watching-sub-info-item"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="watching-list-container">
                <div className="watching-list-heading">
                    <Title level={2} className="watching-list-title">
                        Danh sách tập
                    </Title>
                    <div className="watching-list-sub-info">
                        <p className="watching-list-sub-info-item">16/16</p>
                        <p className="watching-list-sub-info-item">
                            Phát sóng lúc 20h thứ 7 hàng tuần
                        </p>
                    </div>
                </div>
                <div className="session-section">
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        className="session-section-select"
                    >
                        <Button className="session-btn-select">
                            Mùa 1
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                    <span className="session-section-episode">01-07</span>
                </div>
                <div className="watching-list">
                    <div
                        className="watching-list-icon left-move-container"
                        onClick={listRef.current?.prev}
                    >
                        <LeftOutlined />
                    </div>
                    <div
                        className="watching-list-icon right-move-container"
                        onClick={listRef.current?.next}
                    >
                        <RightOutlined />
                    </div>
                    <Carousel
                        className="list-content"
                        dots={false}
                        ref={listRef}
                    >
                        <div>
                            <Row gutter={10} justify="center">
                                {filmMap.map((value) => (
                                    <Col
                                        span={6}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
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
                        <div>
                            <Row gutter={10}>
                                {filmMap.map((value) => (
                                    <Col className="gutter-row" span={6}>
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
                    </Carousel>
                </div>
            </div>
            <div className="watching-list"></div>
            <div className="watching-comment"></div>
        </div>
    );
};
