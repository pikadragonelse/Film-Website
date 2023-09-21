import { StarOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import React from 'react';
import './index.scss';
import Paragraph from 'antd/es/typography/Paragraph';

export type MainInfoFilm = {
    name: string;
    view: number;
    rate?: number;
    hashtag: Array<string>;
    episode?: number;
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
            <h1 className="name">{name}</h1>
            <div className="view-info">
                <div className="view">{view.toLocaleString()} lượt xem</div>
                <Rate className="rate" character={<StarOutlined />} />
            </div>
            <div className="hashtag">
                {hashtag.map((value) => (
                    <a href="#" className="hashtag-item">
                        {value}
                    </a>
                ))}
            </div>
            <h1 className="episode">Tập {episode}</h1>
            <Paragraph
                className="desc"
                ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
            >
                {desc}
            </Paragraph>
        </div>
    );
};
