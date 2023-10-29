import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';
import { SubInfo } from '../../component/sub-info';
import { MenuProps } from 'antd';
import { ListFilm } from '../../component/list-film';
import { Comment } from '../../component/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CurrentUser } from '../../component/comment';
import { Film } from '../../model/film';
import { request } from '../../utils/request';

const moment = require('moment');

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

const currentUser: CurrentUser = {
    username: 'user1',
    email: 'user1@gmail.com',
    avatar: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
};

const defaultFilm = {
    movieId: 0,
    title: '',
    description: '',
    releaseDate: '',
    nation: '',
    posterURL: '',
    trailerURL: '',
    averageRating: '',
    episodeNum: 0,
    level: 0,
    genres: [],
    actors: [],
    episodes: [],
};

export const WatchingPage = () => {
    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const { movieId } = useParams();
    const [currentEpisode, setCurrentEpisode] = useState<number>(1);
    // const episodes = watchingData.episodes.map((episode) => episode);
    const [currentMovieUrl, setCurrentMovieUrl] = useState<string>('');
    const targetEpisode = watchingData.episodes.find(
        (episode) => episode.episode_no === currentEpisode,
    );

    if (targetEpisode) {
        setCurrentMovieUrl(targetEpisode.movie_url);
        setCurrentEpisode(targetEpisode.episode_no);
    }

    const fetchData = async () => {
        try {
            const response = await request.get(`movies/${movieId}`);
            const data = response.data;
            setWatchingData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const year = moment(watchingData.releaseDate).format('YYYY');
    const genres = watchingData?.genres.map((genre) => genre.name) || [];
    const subInfo: Array<SubInfo> = [
        {
            title: 'Diễn viên',
            content: watchingData?.actors
                .map((actor) => actor.name.concat(', '))
                .concat('...') || [''],
        },
        {
            title: 'Thể loại',
            content: watchingData?.genres.map((actor) =>
                actor.name.concat(', '),
            ) || [''],
        },
    ];

    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    // console.log(isLogin);
    const [playTime, setPlayTime] = useState(0);

    const handleProgress = (state: OnProgressProps) => {
        setPlayTime(state.playedSeconds);
    };

    return (
        <div className="watching-container">
            <div className="watching-player-container">
                <ReactPlayer
                    url={currentMovieUrl}
                    poster={watchingData.posterURL}
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
                    name={watchingData.title}
                    hashtag={[...genres, year, 'HD']}
                    desc={watchingData.description}
                    view={30000000}
                    episode={`Tập ${currentEpisode}`}
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
                {/* <ListFilm
                    title="Danh sách tập"
                    subInfo={['16/16', 'Phát sóng lúc 20h thứ 7 hàng tuần']}
                    sessions={items}
                    multiSessions
                    listFilm={watchingData.episodes}
                /> */}
                {/* <ListFilm title="Phim liên quan" listFilm={watchingData} /> */}
            </div>
            <div className="comment-container">
                <Comment
                    title="Comments"
                    isLogin={isLogin}
                    currentUser={currentUser}
                    placeholder="Write a comment..."
                />
            </div>
        </div>
    );
};
