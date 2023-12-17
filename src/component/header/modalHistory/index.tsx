import { CaretRightOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row, Skeleton } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/request';
import { FilmItem } from '../../film-item';
import { ItemHistoryHome } from '../../item-history-home';

const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
const moment = require('moment');

export const ContentModalHistory = () => {
    const [dataHistorymovies, setDataHistorymovies] = useState<FilmItem[]>([]);

    const fetchDataHistorymovies = async () => {
        try {
            const response = await request.get('user/get-movie-history-list?page=1&pageSize=1', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = response.data.data.ListMovie;
            setDataHistorymovies(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataHistorymovies();
    }, []);

    return (
        <div>
            {dataHistorymovies.map((result, index) => (
                <div key={index} className="mr-5">
                    {result.id && result.movieId ? (
                        <Link to={`/movie/${result.movieId}/${result.id}`}>
                            <div className="flex gap-12 justify-center items-center mb-2">
                                <img src={result.backgroundURL} alt="" className="w-36 h-16" />
                                <h1 className="text-black">{result.title}</h1>
                            </div>
                        </Link>
                    ) : (
                        <Link to={`/movie/${result.id || result.movieId}`}>
                            <div className="flex gap-5 justify-center items-center mb-2">
                                <img src={result.backgroundURL} alt="" className="w-10 h-8" />
                                <h1 className="text-black">{result.title}</h1>
                            </div>
                        </Link>
                    )}
                </div>
            ))}
            <Link
                to="/foryou"
                className="text-[#989898] text-[13px] flex justify-center mt-5 hover:text-[red]"
            >
                <div className="mr-2">Khác</div>
                <RightOutlined style={{ fontSize: '10px' }} />
            </Link>
        </div>
    );
};
