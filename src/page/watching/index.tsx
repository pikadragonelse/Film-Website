import React, { useState } from 'react';
import './index.scss';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

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
                />
            </div>
            <div className="watching-info-container">
                <div className="watching-main-info">Hello</div>
                <div className="watching-sub-info">Hello</div>
            </div>
            <div className="watching-episode"></div>
            <div className="watching-relation"></div>
            <div className="watching-comment"></div>
        </div>
    );
};
