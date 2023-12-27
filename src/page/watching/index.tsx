import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment, CurrentUser } from '../../component/comment';
import { IconWithText } from '../../component/icon-with-text';
import { ListEpisodes } from '../../component/list-episode';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { Film, Genres } from '../../model/film';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import './index.scss';

import { ActorFamous } from '../../component/list-actor-famous';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { selectionItems } from './items-selection';
import { useToken } from '../../hooks/useToken';
import { defaultEpisode, defaultFilm } from './default-value';
import axios from 'axios';

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

export const WatchingPage = () => {
    const { userId, accessToken } = useToken();

    const [currentUser, setCurrentUser] = useState<CurrentUser>({
        username: '',
        avatarURL: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        role: 0,
        subscription: {
            closeAt: '',
            subscriptionType: '',
            updatedAt: '',
        },
    });

    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const [rating, setRating] = useState(0);
    const { movieId, episodeId } = useParams();
    const [combinedActorsAndDirectors, setCombinedActorsAndDirectors] = useState<any>([]);
    const [subInfo, setSubInfo] = useState<Array<SubInfo>>([]);
    const [listHashtag, setListHashtag] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            if (accessToken) {
                const response = await request.get(`movies/${movieId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = response.data;
                setWatchingData(data.movie);
                setRating(data.rating);
            } else {
                const response = await request.get(`movies/${movieId}`);
                const data = response.data;
                const dataMovieHandler = {
                    ...data.movie,
                    releaseDate: moment(data.movie).format('YYYY'),
                };
                setListHashtag([
                    ...data.movie.genres.map((genre: Genres) => genre.name),
                    dataMovieHandler.releaseDate,
                    'HD',
                ]);
                setWatchingData(dataMovieHandler);
                setRating(data.rating);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [movieId, accessToken]);

    useEffect(() => {
        setCombinedActorsAndDirectors([
            ...(watchingData?.actors || []),
            ...(watchingData?.directors || []),
        ]);

        setSubInfo([
            {
                title: 'Diễn viên',
                content: watchingData?.actors
                    .map((actor) => actor.name.concat(', '))
                    .concat('...') || [''],
            },
            {
                title: 'Thể loại',
                content: watchingData?.genres.map((actor) => actor.name.concat(', ')) || [''],
            },
        ]);
    }, [watchingData]);

    //api từng tập
    const [dataEpisode, setDataEpisode] = useState<Episodes>(defaultEpisode);

    const getDataEpisode = () => {
        axios.get('');
    };

    //api history
    const saveWatchingHistory = async (episodeId: number, duration: number) => {
        try {
            await request.get(
                `user/add-movie-history?episodeId=${episodeId}&duration=${duration}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const [startTime, setStartTime] = useState<number>(Date.now());
    const calculateElapsedTime = () => {
        if (startTime) {
            const endTime = Date.now();
            const elapsedMinutes = Math.floor((endTime - startTime) / (1000 * 60));
            return elapsedMinutes;
        }
        return 0;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [episodeId]);

    return (
        <div className="watching-container">
            <div className="watching">
                <div className="watching-player-container">
                    <VideoPlayerCustom sourceUrl={dataEpisode.movieURL} />
                </div>
                <div className="watching-list-film-container">
                    <ListEpisodes
                        title="Danh sách tập"
                        subInfo={[
                            `16/${watchingData?.episodeNum}`,
                            'Phát sóng lúc 20h thứ 7 hàng tuần',
                        ]}
                        sessions={selectionItems}
                        multiSessions={false}
                        titleFilm={watchingData?.title}
                        listEpisodes={watchingData?.episodes}
                    />
                    {/* <ListFilm title="Phim liên quan" listFilm={watchingData} /> */}
                </div>
            </div>
            <div className="watching-info-container !mb-[-60px]">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name={watchingData?.title}
                    rate={watchingData?.averageRating}
                    hashtag={listHashtag}
                    desc={watchingData?.description}
                    view={dataEpisode?.numView}
                    episode={`${dataEpisode?.title}`}
                    movieId={parseInt(movieId ?? '0')}
                    rating={rating}
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

            <ActorFamous actors={combinedActorsAndDirectors} size={120} isShow={true} />

            <div className="comment-container">
                <Comment
                    title="Comments"
                    isLogin={accessToken != null ? true : false}
                    currentUser={currentUser}
                    placeholder="Write a comment..."
                />
            </div>
        </div>
    );
};
