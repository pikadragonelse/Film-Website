import React from 'react';
import './index.scss';
import ReadMore from './film-detail-overall-readmore';


export const FilmDetailOverall = () => {
    return (
        <div className="h-6 w-[350px] mx-auto mb-8">
            <p className="text-white font-medium mb-3">STORY</p>
            <ReadMore limitTextLength={250}> hi</ReadMore>
            <div className='overall-detail'>
                <p className="text-white font-medium mb-3">DETAIL</p>
                <p>Last air date</p>
            </div>

        </div>
    );
};
