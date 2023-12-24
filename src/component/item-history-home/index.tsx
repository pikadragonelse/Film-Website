import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Skeleton, Col } from 'antd';
import { useState } from 'react';
import './index.scss';
import { FilmItem } from '../film-item';

export const ItemHistoryHome = ({ title, backgroundMovieURL, movieTitle }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <div className="flex flex-col items-center item-contain-history">
            <div>
                <div className="film-item-container-history relative">
                    <Skeleton.Image
                        active
                        className={`absolute z-10 h-full w-full ${
                            isLoadingImg === false ? 'hidden' : ''
                        }`}
                    />
                    <img
                        src={backgroundMovieURL}
                        alt=""
                        className="film-item-image"
                        onLoad={() => setIsLoadingImg(false)}
                    />
                    <div className="btn-play z-10">
                        <CaretRightOutlined className="text-white" />
                    </div>
                </div>
                <p className="film-item-title !text-[13px]">
                    {movieTitle} - {title}
                </p>
            </div>
            <Button className="film-button-proccess text-center mt-5" icon={<CaretRightOutlined />}>
                Xem tiếp !
            </Button>
        </div>
    );
};
