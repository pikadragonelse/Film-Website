import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';
import { SubInfo } from '../../component/sub-info';
import { MenuProps } from 'antd';
import { Comment } from '../../component/comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CurrentUser } from '../../component/comment';
import { Film } from '../../model/film';
import { request } from '../../utils/request';
import { ListEpisodes } from '../../component/list-episode';

import Cookies from 'js-cookie';
import { log } from 'console';
import { defaultEpisode, defaultFilm } from './default-value';
import { selectionItems } from './items-selection';
import { ControlPlayer } from '../../component/control-player';
import { useAppDispatch } from '../../redux/hook';
import { VideoWatching, setDataVideoWatching } from '../../redux/videoSlice';
import { VideoPlayerCustom } from '../../component/video-player-custom';

interface Episodes {
    episodeId?: number;
    movieId?: number;
    title: string;
    releaseDate?: string;
    posterURL?: string;
    movieURL?: string;
    numView: string;
    duration: number;
    episodeNo?: number;
    titleFilm?: string;
}

const moment = require('moment');


const defaultEpisode = {
    episodeId: 0,
    movieId: 0,
    title: '',
    releaseDate: '',
    posterURL: '',
    movieURL: '',
    numView: '',
    duration: 0,
    episodeNo: 0,
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
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        username: '',
        email: '',
        avatarURL: '',
    });
    const fetchDataCurrentUser = async () => {
        try {
            const response = await request.get('user/get-self-information', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data;
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDataCurrentUser();
    }, []);
    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const { movieId, episodeId } = useParams();

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
    }, [movieId]);

    const year = moment(watchingData.releaseDate).format('YYYY');
    const genres = watchingData?.genres.map((genre) => genre.name) || [];
    const subInfo: Array<SubInfo> = [
        {
            title: 'Diễn viên',
            content: watchingData?.actors.map((actor) => actor.name.concat(', ')).concat('...') || [
                '',
            ],
        },
        {
            title: 'Thể loại',
            content: watchingData?.genres.map((actor) => actor.name.concat(', ')) || [''],
        },
    ];


    const isLogin = useSelector((state: RootState) => state?.user.isLogin);
    // console.log(isLogin);

    const [playTime, setPlayTime] = useState(0);
    //api từng tập
    const [dataEpisode, setDataEpisode] = useState<Episodes>(defaultEpisode);
    const fetchDataEpisode = async () => {
        const response = await request.get(`episode/${episodeId}`).catch((err) => {
            console.log(err);
        });
        const data = response?.data;
        console.log(data);

        //kiểm tra
        if (watchingData.movieId !== data.movieId) {
            await fetchData();
        }
        setDataEpisode(data);
    };
    useEffect(() => {
        fetchDataEpisode();
        window.scrollTo(0, 0);
    }, [episodeId]);

    return (
        <div className="watching-container">
            <div className="watching">
                <div className="watching-player-container">

                    <VideoPlayerCustom />

                </div>
                <div className="watching-list-film-container">
                    <ListEpisodes
                        title="Danh sách tập"
                        subInfo={[
                            `16/${watchingData.episodeNum}`,
                            'Phát sóng lúc 20h thứ 7 hàng tuần',
                        ]}

                        sessions={items}
                        multiSessions={false}
                        titleFilm={watchingData.title}
                        listEpisodes={watchingData.episodes}
                    />
                    {/* <ListFilm title="Phim liên quan" listFilm={watchingData} /> */}
                </div>
            </div>
            <div className="watching-info-container">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name={watchingData.title}
                    rate={watchingData.averageRating}
                    hashtag={[...genres, year, 'HD']}
                    desc={watchingData.description}
                    view={dataEpisode.numView}
                    episode={`${dataEpisode.title}`}
                />

                <div className="watching-sub-info-container">
                    <div className="watching-feature">
                        <IconWithText
                            icon={<CommentOutlined className="watching-feature-icon" />}
                            text="Bình luận"
                        />
                        <IconWithText
                            icon={<ShareAltOutlined className="watching-feature-icon" />}
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
