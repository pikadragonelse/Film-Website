import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment, CurrentUser } from '../../component/comment';
import { IconWithText } from '../../component/icon-with-text';
import { ListEpisodes } from '../../component/list-episode';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { Film } from '../../model/film';
import { RootState } from '../../redux/store';
import { request } from '../../utils/request';
import './index.scss';

import Cookies from 'js-cookie';
import { ActorFamous } from '../../component/list-actor-famous';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { selectionItems } from './items-selection';

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
    directors: [],
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
    const [rating, setRating] = useState(0);
    const { movieId, episodeId } = useParams();
    const isLogin = useSelector((state: RootState) => state.user.isLogin);

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
                setWatchingData(data.movie);
                setRating(data.rating);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [movieId, isLogin]);

    const combinedActorsAndDirectors = [...watchingData.actors, ...watchingData.directors];

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

    //api từng tập
    const [dataEpisode, setDataEpisode] = useState<Episodes>(defaultEpisode);
    const fetchDataEpisode = async () => {
        try {
            let response;

            if (accessToken) {
                response = await request.get(`episode/${episodeId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            } else {
                response = await request.get(`episode/${episodeId}`);
            }

            const data = response?.data;

            // Check if the movieId is different
            if (watchingData.movieId !== data.movieId) {
                await fetchData();
            }

            setDataEpisode(data);

            // Save watching history if startTime is available
            if (startTime) {
                const elapsedMinutes = calculateElapsedTime();
                saveWatchingHistory(data.episodeId, elapsedMinutes);
            }

            setStartTime(Date.now());
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDataEpisode();
        window.scrollTo(0, 0);
    }, [episodeId]);
    console.log(dataEpisode);
    //api history
    const saveWatchingHistory = async (episodeId: number, duration: number) => {
        try {
            const response = await request.get(
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
    const [startTime, setStartTime] = useState<number | null>(null);
    const calculateElapsedTime = () => {
        if (startTime) {
            const endTime = Date.now();
            const elapsedMinutes = Math.floor((endTime - startTime) / (1000 * 60));
            return elapsedMinutes;
        }
        return 0;
    };

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
                            `16/${watchingData.episodeNum}`,
                            'Phát sóng lúc 20h thứ 7 hàng tuần',
                        ]}
                        sessions={selectionItems}
                        multiSessions={false}
                        titleFilm={watchingData.title}
                        listEpisodes={watchingData.episodes}
                    />
                    {/* <ListFilm title="Phim liên quan" listFilm={watchingData} /> */}
                </div>
            </div>
            <div className="watching-info-container !mb-[-60px]">
                <MainInfoFilm
                    className="watching-main-info-container"
                    name={watchingData.title}
                    rate={watchingData.averageRating}
                    hashtag={[...genres, year, 'HD']}
                    desc={watchingData.description}
                    view={dataEpisode.numView}
                    episode={`${dataEpisode.title}`}
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
                    isLogin={isLogin}
                    currentUser={currentUser}
                    placeholder="Write a comment..."
                />
            </div>
        </div>
    );
};
