import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment, CurrentUser } from '../../component/comment';
import { IconWithText } from '../../component/icon-with-text';
import { ListEpisodes } from '../../component/list-episode';
import { MainInfoFilm } from '../../component/main-info-film';
import { SubInfo } from '../../component/sub-info';
import { DAFilm, Episode, Film, Genres } from '../../model/film';
import { request } from '../../utils/request';
import './index.scss';

import { ActorFamous } from '../../component/list-actor-famous';
import { VideoPlayerCustom } from '../../component/video-player-custom';
import { selectionItems } from './items-selection';
import { useToken } from '../../hooks/useToken';
import { defaultEpisode, defaultFilm } from './default-value';
import { defaultUser } from '../../model/user';

const moment = require('moment');

export const WatchingPage = () => {
    const { userId, accessToken } = useToken();

    const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultUser);

    const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
    const [rating, setRating] = useState(0);
    const { movieId, episodeId } = useParams();
    const [combinedActorsAndDirectors, setCombinedActorsAndDirectors] = useState<Array<DAFilm>>([]);
    const [subInfo, setSubInfo] = useState<Array<SubInfo>>([]);
    const [listHashtag, setListHashtag] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const response = await request.get(`movies/${movieId}`);
            const data = response.data;

            console.log(data);

            setWatchingData(data.movie);
            setRating(data.rating);
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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [movieId, accessToken]);

    //api từng tập
    const [dataEpisode, setDataEpisode] = useState<Episode>(defaultEpisode);

    const getDataEpisode = () => {
        request
            .get(`/episode/${watchingData.episodes[0]?.episode_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => setDataEpisode(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (watchingData != null) {
            const listDA: DAFilm[] = [
                ...watchingData?.actors,
                ...watchingData?.directors,
            ] as DAFilm[];

            setCombinedActorsAndDirectors(listDA);

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
            getDataEpisode();
        }
    }, [watchingData]);

    //api history
    const saveWatchingHistory = (episodeId: number, duration: number) => {
        try {
            request.get(`user/add-movie-history?episodeId=${episodeId}&duration=${duration}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [episodeId]);

    return (
        <div className="watching-container">
            <div className="watching ">
                <div className="watching-player-container flex-1 bg-zinc-800 relative ">
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

            <ActorFamous DAlist={combinedActorsAndDirectors} size={120} isShow={true} />

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
