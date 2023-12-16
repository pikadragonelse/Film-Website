import { StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';
import { Rate, Popover } from 'antd';
import React from 'react';
import './index.scss';
import Paragraph from 'antd/es/typography/Paragraph';
import { ModalRating } from '../../page/watching/modalRating';

export type MainInfoFilm = {
    name: string;
    view: string;
    rate: string;
    hashtag?: Array<string>;
    episode?: string;
    desc: string;
    className?: string;
};
export const MainInfoFilm = ({
    name,
    view,
    rate,
    hashtag,
    episode,
    desc,
    className,
}: MainInfoFilm) => {
    return (
        <div className={`main-info-container ${className}`}>
            <div className="name-esp">
                <h1 className="name">{name} </h1>
                {'-'}
                <h1 className="episode">{episode}</h1>
            </div>
            <div className="view-info">
                <div className="view">{view.toLocaleString()} lượt xem</div>

                <div className="rating">
                    <p>{rate}</p>
                    <StarFilled style={{ color: '#fadb14', fontSize: 20 }} />
                </div>
                <Popover overlayStyle={{ maxWidth: '100%' }} content={<ModalRating />}>
                    <div>Đánh giá ngay</div>
                </Popover>
            </div>
            <div className="hashtag">
                {hashtag?.map((value) => (
                    <a href="#" className="hashtag-item">
                        {value}
                    </a>
                ))}
            </div>

            <Paragraph
                className="desc"
                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
            >
                {desc}
            </Paragraph>
        </div>
    );
};
