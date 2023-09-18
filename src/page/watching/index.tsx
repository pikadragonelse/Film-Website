import React from 'react';
import './index.scss';

export const WatchingPage = () => {
    return (
        <div className="watching-container">
            <div className="watching-player-container"></div>
            <div className="watching-info-container">
                <div className="watching-main-info"></div>
                <div className="watching-sub-info"></div>
            </div>
            <div className="watching-episode"></div>
            <div className="watching-relation"></div>
            <div className="watching-comment"></div>
        </div>
    );
};
