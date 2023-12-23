import { CaretRightOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Badge, Button, Modal, Skeleton } from 'antd';
import { useState } from 'react';
import { FilmItem } from '../film-item';
import './index.scss';

export const ItemReserveMovie = ({ title, posterURL, level, releaseDate, movieId }: FilmItem) => {
    const [isLoadingImg, setIsLoadingImg] = useState(true);
    const [isReserved, setIsReserved] = useState(false);
    const [initialButtonText, setInitialButtonText] = useState('Đặt lịch');

    const handleReserveClick = async () => {
        const currentDate = new Date();
        const formattedReleaseDate = releaseDate ? new Date(releaseDate) : null;

        if (formattedReleaseDate) {
            const isReleaseDateToday =
                currentDate.toDateString() === formattedReleaseDate.toDateString();

            if (isReleaseDateToday) {
                await Modal.success({
                    title: 'Thông báo',
                    content: 'Hôm nay có phim ra mắt!',
                });
            } else {
                const successMessage = !isReserved
                    ? 'Đặt lịch thành công! Chúc bạn có những trải nghiệm thật tuyệt vời tại MovTime ❤'
                    : 'Bạn đã hủy đặt lịch!';

                await Modal.success({
                    title: 'Thông báo',
                    content: successMessage,
                });

                setInitialButtonText(isReserved ? 'Đặt lịch' : 'Hủy');
                setIsReserved(!isReserved);
            }
        } else {
            console.log('fail');
        }
    };

    return (
        <div>
            <Badge.Ribbon
                text={level === 1 ? 'VIP' : ''}
                color={level === 1 ? 'red' : '#111111'}
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
                    className={`film-button-reserve flex items-center justify-center text-center !mt-10 ${
                        isReserved ? 'reserved' : ''
                    }`}
                    icon={<FieldTimeOutlined />}
                    onClick={handleReserveClick}
                    style={{ color: isReserved ? 'red' : 'white' }}
                >
                    {initialButtonText}
                </Button>
            </Badge.Ribbon>
        </div>
    );
};
