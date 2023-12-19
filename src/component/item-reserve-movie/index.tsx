import { CaretRightOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Badge, Button, Skeleton } from 'antd';
import { useState } from 'react';
import { FilmItem } from '../film-item';
import './index.scss';

export const ItemReserveMovie = ({
    title,
    posterURL,
    posterMovieURL,
    movieTitle,
    level,
}: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);

    return (
        <>
            {level === 1 ? (
                <Badge.Ribbon
                    text="VIP"
                    color="red"
                    className={`${isLoadingImg === true ? 'hidden' : ''}`}
                >
                    <div className="film-item-container relative">
                        <Skeleton.Image
                            active
                            className={`absolute z-10 h-full w-full ${
                                isLoadingImg === false ? 'hidden' : ''
                            }`}
                        />
                        <img
                            src={posterURL}
                            alt=""
                            className="film-item-image"
                            onLoad={() => setIsLoadingImg(false)}
                        />
                        <div className="btn-play z-10">
                            <CaretRightOutlined className="text-white" />
                        </div>
                    </div>
                    <h1 className="film-item-title max-w-[204px] ">{title}</h1>
                    <Button
                        className="film-button-reserve flex items-center justify-center text-center !mt-10"
                        icon={<FieldTimeOutlined />}
                        onClick={() => alert('hihi')}
                    >
                        Đặt lịch
                    </Button>
                </Badge.Ribbon>
            ) : (
                <div>
                    <div className="film-item-container relative">
                        <Skeleton.Image
                            active
                            className={`absolute z-10 h-full w-full ${
                                isLoadingImg === false ? 'hidden' : ''
                            }`}
                        />
                        <img
                            src={posterURL}
                            alt=""
                            className="film-item-image"
                            onLoad={() => setIsLoadingImg(false)}
                        />
                        <div className="btn-play z-10">
                            <CaretRightOutlined className="text-white" />
                        </div>
                    </div>
                    <h1 className="film-item-title max-w-[204px]">{title}</h1>
                    <Button
                        className="film-button-reserve flex items-center justify-center text-center !mt-10"
                        icon={<FieldTimeOutlined />}
                        onClick={() => alert('hihi')}
                    >
                        Đặt lịch
                    </Button>
                </div>
            )}
        </>
    );
};
