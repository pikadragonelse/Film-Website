import React, { useState } from 'react';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import { MainInfoFilm } from '../../component/main-info-film';
import { IconWithText } from '../../component/icon-with-text';

export const WatchingPage = () => {
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
                        <div className="watching-sub-info-item">
                            <span className="watching-sub-info-item-title">
                                Diễn viên:
                            </span>
                            &nbsp;
                            <span className="watching-sub-info-item-content">
                                Monkey.D Luffy, Rononoa Zoro, Chopper, Usopp,
                                Brook, Franky, Robin, Nami, Jinbei, Sanji
                            </span>
                        </div>
                        <div className="watching-sub-info-item">
                            <span className="watching-sub-info-item-title">
                                Thể loại:
                            </span>
                            &nbsp;
                            <span className="watching-sub-info-item-content">
                                Anime
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="watching-episode-list"></div>
            <div className="watching-relation-list"></div>
            <div className="watching-comment"></div>
        </div>
    );
};
