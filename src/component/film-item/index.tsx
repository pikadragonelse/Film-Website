import { CaretRightOutlined, CloseOutlined, PlayCircleTwoTone } from '@ant-design/icons';
import { Badge } from 'antd';
import './index.scss';

export type FilmItem = {
    data?: any;
    name: string;
    yearOfManufacture: number;
    category: Array<string>;
    poster: string;
    onCancelClick?: () => void;
};

export const FilmItem = ({
    name,
    yearOfManufacture,
    category,
    poster,
    onCancelClick,
}: FilmItem) => {
    return (
        <Badge.Ribbon text="Hot" color="red">
            <div className="film-item-container">
                <div className="film-item-info">
                    <h1 className="film-item-title ">{name}</h1>
                    <p className="film-item-sub-info">{yearOfManufacture}</p>
                </div>
                <img src={poster} alt="" className="film-item-image" />
                <div className="btn-play">
                    <CaretRightOutlined />
                </div>

                {onCancelClick ? (
                    <div className="btn-close" onClick={onCancelClick}>
                        <CloseOutlined />
                    </div>
                ) : undefined}
            </div>
            {/* <h1 className="film-item-title ">{name}</h1> */}
        </Badge.Ribbon>
    );
};
