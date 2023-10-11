import './index.scss';
import { CloseOutlined } from '@ant-design/icons';

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
        <div className="film-item-container">
            <div className="film-item-info">
                <h1 className="film-item-title">{name}</h1>
                <p className="film-item-sub-info">
                    {yearOfManufacture} {'•'} {category}
                </p>
            </div>
            <img src={poster} alt="" className="film-item-image" />
            {onCancelClick ? (
                <div className="btn-close" onClick={onCancelClick}>
                    <CloseOutlined />
                </div>
            ) : undefined}
        </div>
    );
};
