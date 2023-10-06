import React, { useState } from 'react';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';
import { SubInfo } from '../../component/sub-info';
import { MenuProps } from 'antd';
import { FilmItem } from '../../component/film-item';
import { ListFilm } from '../../component/list-film';
import { PluginComment } from '../../component/plugin-comment';
import { Comment } from '../../component/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser,
    );
    console.log(currentUser);
    const [playTime, setPlayTime] = useState(0);

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
            <div className="watching-list-film-container">
                <ListFilm
                    title="Danh sách tập"
                    subInfo={['16/16', 'Phát sóng lúc 20h thứ 7 hàng tuần']}
                    sessions={items}
                    multiSessions
                    listFilm={[filmMap, filmMap]}
                />
                <ListFilm
                    title="Phim liên quan"
                    listFilm={[filmMap, filmMap]}
                />
            </div>
            {/* <div className="box-comment" id="tabs-facebook">
                <PluginComment dataHref="http://localhost:3000/watching" />
            </div> */}
            <div className="comment-container">
                <Comment title="Comments" currentUser={currentUser} />
            </div>
        </div>
    );
};
