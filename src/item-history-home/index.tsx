import { CaretRightOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import { useState } from 'react';
import { FilmItem } from '../component/film-item';
import './index.scss';

export const ItemHistoryHome = ({ title, backgroundURL }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <>
            <div className="film-item-container-history relative">
                <Skeleton.Image
                    active
                    className={`absolute z-10 h-full w-full ${
                        isLoadingImg === false ? 'hidden' : ''
                    }`}
                />
                <img
                    src={backgroundURL}
                    alt=""
                    className="film-item-image"
                    onLoad={() => setIsLoadingImg(false)}
                />
                <div className="btn-play z-10">
                    <CaretRightOutlined className="text-white" />
                </div>
            </div>
            <h1 className="film-item-title max-w-[204px]">{title}</h1>
        </>
    );
};
